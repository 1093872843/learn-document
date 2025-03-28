# 本文将基于文本数据并使用Rag技术实现对特定知识源的问答访问
# RAG通常需要实现两部分
#  1. 从数据源中提取数据,并存储到向量存储库
#  2. 从提问中检索向量存储库中相关数据,将数据放入模型上下文中,并将其传递给模型.
import bs4
from langchain_deepseek import ChatDeepSeek
from typing import Tuple
import tiktoken
from langchain_ollama import OllamaEmbeddings
from langchain_core.vectorstores import InMemoryVectorStore
from langchain import hub
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.graph import START, StateGraph
from typing_extensions import List, TypedDict

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
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=200, add_start_index=True
)
all_splits = text_splitter.split_documents(docs)

# 将文档添加进向量存储中
vector_store.add_documents(documents=all_splits)

# Define prompt for question-answering
prompt = hub.pull("rlm/rag-prompt")


# 定义langGraph 节点基本信息
class State(TypedDict):
    question: str
    context: List[Document]
    answer: str


# 定义检索节点信息
# 这将根据问题中的关键信息查找之前被分割文档中的有用片段
def retrieve(state: State):
    retrieved_docs = vector_store.similarity_search(state["question"])
    return {"context": retrieved_docs}

# 定义生成节点信息
# 将检索到的有用片段添加到LLM的上下文中进行提问
def generate(state: State):
    docs_content = "\n\n".join(doc.page_content for doc in state["context"])
    messages = prompt.invoke({"question": state["question"], "context": docs_content})
    response = model.invoke(messages)
    return {"answer": response.content}

# 组合节点生成编排流
graph_builder = StateGraph(State).add_sequence([retrieve, generate])
graph_builder.add_edge(START, "retrieve")
graph = graph_builder.compile()
#开始调试
result = graph.invoke({"question": "某些关于文档的内容"})
print(f'Context: {result["context"]}\n\n')
print(f'Answer: {result["answer"]}')