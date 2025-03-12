# 本案例根据rag_agent案例拓展,请先看完rag_agent.
# 本案例在rag_agent基础上,拓展了持续聊天的功能，这需要对聊天记录进行记忆.
from langchain_deepseek import ChatDeepSeek
from typing import Tuple
import tiktoken
from langchain_ollama import OllamaEmbeddings
from langchain_core.vectorstores import InMemoryVectorStore
from langchain import hub
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from typing_extensions import List, TypedDict
from langgraph.graph import MessagesState, StateGraph
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage
from langgraph.graph import END
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver

# 创建模型实例
class ChatOpenAIIn05(ChatDeepSeek):
    def _get_encoding_model(self) -> Tuple[str, tiktoken.Encoding]:
        # Set the model to a valid one to avoid errors
        model = "gpt-3.5-turbo"
        return model, tiktoken.encoding_for_model(model)

model = ChatOpenAIIn05(
    model="deepseek-chat",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)
# 创建嵌入模型实例
embeddings = OllamaEmbeddings(model="llama3:8b")
# 创建向量存储实例
vector_store = InMemoryVectorStore(embeddings)

# 正文开始
file_path = "../example_data/1.pdf"
loader = PyPDFLoader(file_path)
docs = loader.load()
# print(docs)
# 上述加载的文本内容非常多, 这无法直接放入LLM模型的上下文中,所以我们需要切割文档,方便后续检索关键片段.
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
all_splits = text_splitter.split_documents(docs)

# 将文档添加进向量存储中
vector_store.add_documents(documents=all_splits)

# 这里我们将rag_agent案例中的检索步骤节点变为一个工具
# @tool是langchain自定义的一个装饰器
@tool(response_format="content_and_artifact")
def retrieve(query: str):
    """Retrieve information related to a query."""
    # 上一行字符串是对工具函数的描述.
    # 该函数会将向量存储库中查询到的内容转换为一个更加合理的提示词.
    retrieved_docs = vector_store.similarity_search(query, k=2)
    serialized = "\n\n".join(
        (f"Source: {doc.metadata}\n" f"Content: {doc.page_content}")
        for doc in retrieved_docs
    )
    return serialized, retrieved_docs

# 创建langGraph的三个节点
# 节点一：处理用户输入；
def query_or_respond(state: MessagesState):
    # 绑定检索工具
    print('这里是消息 \n')
    print(state["messages"])
    llm_with_tools = model.bind_tools([retrieve])
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}
# 节点二：调用上一个节点的工具；
tools = ToolNode([retrieve])
# 节点三：使用检索到的上下文生成最终响应的节点。
def generate(state: MessagesState):
    # 提取其中由工具调用检索返回的内容
    recent_tool_messages = []
    for message in reversed(state["messages"]):
        if message.type == "tool":
            recent_tool_messages.append(message)
        else:
            break
    tool_messages = recent_tool_messages[::-1]

    # 结合外部数据源构建上下文
    docs_content = "\n\n".join(doc.content for doc in tool_messages)
    system_message_content = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer "
        "the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the "
        "answer concise."
        "\n\n"
        f"{docs_content}"
    )
    # 构建对话消息
    conversation_messages = [
        message
        for message in state["messages"]
        if message.type in ("human", "system")
        or (message.type == "ai" and not message.tool_calls)
    ]
    prompt = [SystemMessage(system_message_content)] + conversation_messages

    # Run
    response = model.invoke(prompt)
    return {"messages": [response]}

# 构建Graph编排流.
graph_builder = StateGraph(MessagesState)
graph_builder.add_node(query_or_respond)
graph_builder.add_node(tools)
graph_builder.add_node(generate)

graph_builder.set_entry_point("query_or_respond")
graph_builder.add_conditional_edges(
    "query_or_respond",
    tools_condition,
    {END: END, "tools": "tools"},
)
graph_builder.add_edge("tools", "generate")
graph_builder.add_edge("generate", END)

# 构建并记忆
memory = MemorySaver()
graph = graph_builder.compile(checkpointer=memory)
config = {"configurable": {"thread_id": "abc123"}}

input_message = "你知道1+1等于几"

for step in graph.stream(
    {"messages": [{"role": "user", "content": input_message}]},
    stream_mode="values",
    config=config,
):
    step["messages"][-1].pretty_print()

input_message = "我上一次问的是什么"

for step in graph.stream(
    {"messages": [{"role": "user", "content": input_message}]},
    stream_mode="values",
    config=config,
):
    step["messages"][-1].pretty_print()