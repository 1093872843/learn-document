# 案例：创建一个聊天并使用裁剪上下文的方法 管理聊天上下文避免超出LLM上下文限制

from langchain_core.messages import SystemMessage, trim_messages,HumanMessage,AIMessage
from langchain_deepseek import ChatDeepSeek
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langchain_core.messages import HumanMessage
from typing_extensions import Annotated, TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages
from typing import Sequence
from typing import Tuple
import tiktoken

# 创建模型实例
# 因为trim_messages只能裁剪部分模型，为了让代码执行，这里强行修改了模型的名称
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

# 定义 修剪器,通过该修剪器的聊天内容会被过滤掉一部分的信息，减少上下文长度
trimmer = trim_messages(
    max_tokens=65,
    strategy="last",
    token_counter=model,
    include_system=True,
    allow_partial=False,
    start_on="human",
)
# 模拟一个上下文消息
messages = [
    SystemMessage(content="you're a good assistant"),
    HumanMessage(content="hi! I'm bob"),
    AIMessage(content="hi!"),
    HumanMessage(content="I like vanilla ice cream"),
    AIMessage(content="nice"),
    HumanMessage(content="whats 2 + 2"),
    AIMessage(content="4"),
    HumanMessage(content="thanks"),
    AIMessage(content="no problem!"),
    HumanMessage(content="having fun?"),
    AIMessage(content="yes!"),
]

# 创建工作流
workflow = StateGraph(state_schema=MessagesState)

# 定义节点执行逻辑
def call_model(state: MessagesState):
    # 裁剪消息
    trimmed_messages = trimmer.invoke(state["messages"])
    response = model.invoke(trimmed_messages)
    return {"messages": response}

#　添加节点
workflow.add_edge(START, "model")
workflow.add_node("model", call_model)

# 添加记忆存储服务
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)

# 发起聊天
# 现在，如果我们尝试询问模型我们的名字，它将不会知道，因为我们修剪了聊天记录的那部分
config = {"configurable": {"thread_id": "abc567"}}
query = "What is my name?"
input_messages = messages + [HumanMessage(query)]
output = app.invoke(
    {"messages": input_messages},
    config,
)
output["messages"][-1].pretty_print()

#但如果我们询问最近几条消息中的信息，它会记住：
query = "What math problem did I ask?"
input_messages = messages + [HumanMessage(query)]
output = app.invoke(
    {"messages": input_messages},
    config,
)
output["messages"][-1].pretty_print()