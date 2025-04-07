# Agent流式输出
# 实际使用中,Agent可能由于思考的原因,需要很长时间才能得到完整结果,但是向用户提供进度的反馈很重要，可以通过流式输出解决这点。
# 这里我们使用tavily执行网络搜索工作,它会花费较长的时间，该工具需要在官网注册账号并获取API key,设置结束后，需要重启ycharm生效
# pip install llama-index-tools-tavily-research

from dotenv import load_dotenv
load_dotenv()

from llama_index.core.agent.workflow import AgentWorkflow
from llama_index.core.workflow import Context
from llama_index.tools.tavily_research import TavilyToolSpec
import os
from llama_index.core.agent.workflow import (
    AgentInput,
    AgentOutput,
    ToolCall,
    ToolCallResult,
    AgentStream,
)
from model.ollama_model import local_model

llm = local_model(model='qwen2.5:7b')
tavily_tool = TavilyToolSpec( api_key=os.getenv("TAVILY_API_KEY") )

workflow = AgentWorkflow.from_tools_or_functions(
    tavily_tool.to_tool_list(),
    llm=llm,
    system_prompt="You're a helpful assistant that can search the web for information."
)

async def main():
    # 之前的案例中,我们使用了await 获取最终响应,如果不适用await,我们将得到一个异步迭代器,这个迭代器将返回各种事件。
    handler = workflow.run(user_msg="What's the weather like in San Francisco?")


    async for event in handler.stream_events():
        if isinstance(event, AgentStream):
            # 最新输出的消息。
            print(event.delta, end="", flush=True)
        elif isinstance(event, AgentInput):
            # 开始代理执行的完整消息对象
            print("Agent input: ", event.input)  # the current input messages
            print("Agent name:", event.current_agent_name)  # the current agent name
        elif isinstance(event, AgentOutput):
            # 代理的响应
            print("Agent output: ", event.response)  # the current full response
            print("Tool calls made: ", event.tool_calls)  # the selected tool calls, if any
            print("Raw LLM response: ", event.raw)  # the raw llm api response
        elif isinstance(event, ToolCallResult):
            # 工具调用的结果
            print("Tool called: ", event.tool_name)  # the tool name
            print("Arguments to the tool: ", event.tool_kwargs)  # the tool kwargs
            print("Tool output: ", event.tool_output)  # the tool output

    # print final output
    print(str(await handler))

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())