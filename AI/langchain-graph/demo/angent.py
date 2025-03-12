# 该案例失败,无法获取可用的搜索引擎
# 该案例的Agent具备多轮对话功能,将实现与搜索引擎交互,通过向代理提问,返回搜索引擎的搜索结果.
import os
from langchain_anthropic import ChatAnthropic
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import HumanMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

# Claude 是 Anthropic 开发的一系列先进的大型语言模型。
model = ChatAnthropic(model_name="claude-3-sonnet-20240229")
# 创建搜索引擎，Tavily是一款搜索引擎api（https://tavily.com/#pricing）
os.environ["TAVILY_API_KEY"] = '1'
search = TavilySearchResults(max_results=2)
tools = [search]
# 创建持久记忆服务
memory = MemorySaver()
agent_executor = create_react_agent(model, tools, checkpointer=memory)

# Use the agent
config = {"configurable": {"thread_id": "abc123"}}
for step in agent_executor.stream(
    {"messages": [HumanMessage(content="hi im bob! and i live in sf")]},
    config,
    stream_mode="values",
):
    step["messages"][-1].pretty_print()
