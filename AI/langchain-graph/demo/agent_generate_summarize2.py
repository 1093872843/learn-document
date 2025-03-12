# 本案例 结合agent实现提取文本摘要
# 核心问题是如何将文档传递到LLM上下文窗口
# 生成的graph流程图为 ./img/agent_generate_summarize2.png
from langchain_deepseek import ChatDeepSeek
from typing import Tuple
import tiktoken
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import CharacterTextSplitter
import operator
from typing import Annotated, List, Literal, TypedDict
from langchain.chains.combine_documents.reduce import (
    acollapse_docs,
    split_list_of_docs,
)
from langchain_core.documents import Document
from langgraph.constants import Send
from langgraph.graph import END, START, StateGraph
import asyncio

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

# 加载web文档
loader = WebBaseLoader("https://juejin.cn/post/7468490058481336335")
docs = loader.load()
# print(docs)

#------------摘要方法二------分批次总结------------
# 对于无法一次性总结的文本，我们可以将每个文档映射单个摘要，最后将所有摘要合并为全局摘要
# 定义提取摘要的提示词模板
map_prompt = ChatPromptTemplate.from_messages(
    [("system", "Write a concise summary of the following:\\n\\n{context}")]
)

# 定义合并摘要的提示词模板
reduce_template = """
The following is a set of summaries:
{docs}
Take these and distill it into a final, consolidated summary
of the main themes.
"""
reduce_prompt = ChatPromptTemplate([("human", reduce_template)])

# 分割文本以免超出上下文限制
text_splitter = CharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=1000, chunk_overlap=0
)
split_docs = text_splitter.split_documents(docs)
print(f"Generated {len(split_docs)} documents.")

# 这里假设上下文最大限制1000token模拟实际情况
token_max = 1000

# 获取文档token数量
def length_function(documents: List[Document]) -> int:
    return sum(model.get_num_tokens(doc.page_content) for doc in documents)


# 最终结果的数据结构，贯穿整个编排
class OverallState(TypedDict):
    # 需要分析得到文档字符串列表
    contents: List[str]
    # 摘要列表,operator.add表明该值将会交由langCore由多个值拼接而成
    summaries: Annotated[list, operator.add]
    # 文档结构的摘要列表
    collapsed_summaries: List[Document]
    # 最终合并摘要文本
    final_summary: str

# 根据单个文档生成摘要的节点数据结构
class SummaryState(TypedDict):
    content: str

# 生成摘要节点
async def generate_summary(state: SummaryState):
    prompt = map_prompt.invoke(state["content"])
    response = await model.ainvoke(prompt)
    return {"summaries": [response.content]}


# 收集摘要节点
def map_summaries(state: OverallState):
    return [
        # send时langGraph的一个函数,用于在节点之间传递数据
        Send("generate_summary", {"content": content}) for content in state["contents"]
    ]


def collect_summaries(state: OverallState):
    return {
        "collapsed_summaries": [Document(summary) for summary in state["summaries"]]
    }

# 合并摘要函数
async def _reduce(input: dict) -> str:
    prompt = reduce_prompt.invoke(input)
    response = await model.ainvoke(prompt)
    return response.content


# 缩减上下文
async def collapse_summaries(state: OverallState):
    doc_lists = split_list_of_docs(
        state["collapsed_summaries"], length_function, token_max
    )
    results = []
    for doc_list in doc_lists:
        results.append(await acollapse_docs(doc_list, _reduce))

    return {"collapsed_summaries": results}


# 判断生成的文档结构的摘要列表是否超出最大上下文
# 超出返回collapse_summaries进入缩减上下文节点
# 未超出则返回generate_final_summary进入输出节点
def should_collapse(
    state: OverallState,
) -> Literal["collapse_summaries", "generate_final_summary"]:
    num_tokens = length_function(state["collapsed_summaries"])
    if num_tokens > token_max:
        return "collapse_summaries"
    else:
        return "generate_final_summary"


# 生成最终上下文节点
async def generate_final_summary(state: OverallState):
    response = await _reduce(state["collapsed_summaries"])
    return {"final_summary": response}


# 定义graph编排
# StateGraph 定义的工作流节点是共享状态的,即节点修改数据数据是共享的
graph = StateGraph(OverallState)
graph.add_node("generate_summary", generate_summary)  # same as before
graph.add_node("collect_summaries", collect_summaries)
graph.add_node("collapse_summaries", collapse_summaries)
graph.add_node("generate_final_summary", generate_final_summary)

# Edges:
#add_conditional_edges 添加条件选择边,START节点执行完会执行map_summaries函数.
graph.add_conditional_edges(START, map_summaries)
graph.add_edge("generate_summary", "collect_summaries")
graph.add_conditional_edges("collect_summaries", should_collapse)
graph.add_conditional_edges("collapse_summaries", should_collapse)
graph.add_edge("generate_final_summary", END)

app = graph.compile()

async def main():
    # 异步执行调用流
    async for step in app.astream(
            {"contents": [doc.page_content for doc in split_docs]},
            {"recursion_limit": 10},
    ):
        print(list(step.values()))

# 运行异步函数
asyncio.run(main())