# 案例: 创建一个聊天，支持用户切换

from langchain_deepseek import ChatDeepSeek
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langchain_core.messages import HumanMessage

# 创建模型实例
model = ChatDeepSeek(
            model="deepseek-chat",
            temperature=0,
            max_tokens=None,
            timeout=None,
            max_retries=2,
            # other params...
        )

# 创建一个工作流，state_schema为每个节点的输入参数
workflow = StateGraph(state_schema=MessagesState)


# 定义节点信息，MessagesState为LangGraph内置的数据结构
def call_model(state: MessagesState):
    response = model.invoke(state["messages"])
    return {"messages": response}


# 添加节点到工作流中
workflow.add_edge(START, "model")
workflow.add_node("model", call_model)

# 添加永久存储
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)

# 定义RunnableConfig
config1 = {"configurable": {"thread_id": "abc123"}}

# 第一轮对话
query = "Hi! I'm Bob."
input_messages = [HumanMessage(query)]
output = app.invoke({"messages": input_messages}, config1)
output["messages"][-1].pretty_print()  # output contains all messages in state

# 第二轮对话
query = "What's my name?"
input_messages = [HumanMessage(query)]
output = app.invoke({"messages": input_messages}, config1)
output["messages"][-1].pretty_print()

# 切换新用户进行对话
config2 = {"configurable": {"thread_id": "abc234"}}
query = "What's my name?"
input_messages = [HumanMessage(query)]
output = app.invoke({"messages": input_messages}, config2)
output["messages"][-1].pretty_print()

# 返回原用户进行对话
query = "What's my name?"
input_messages = [HumanMessage(query)]
output = app.invoke({"messages": input_messages}, config1)
output["messages"][-1].pretty_print()








