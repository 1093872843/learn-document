
# 默认下,AgentWorkflow是无状态的,即无记忆的.
# LlamaIndex提供了Context管理记忆。
# 并且Context 是可序列化的，因此可以将其保存到数据库、文件等，并在稍后加载回来。
from model.ollama_model import local_model
from llama_index.core.agent.workflow import AgentWorkflow
from llama_index.tools.yahoo_finance import YahooFinanceToolSpec
from llama_index.core.workflow import Context
from llama_index.core.workflow import JsonPickleSerializer, JsonSerializer

def multiply(a: float, b: float) -> float:
    """Multiply two numbers and returns the product"""
    return a * b

def add(a: float, b: float) -> float:
    """Add two numbers and returns the sum"""
    return a + b

llm = local_model(model='qwen2.5:7b')

finance_tools = YahooFinanceToolSpec().to_tool_list()
finance_tools.extend([multiply, add])

workflow = AgentWorkflow.from_tools_or_functions(
    finance_tools,
    llm=llm,
    system_prompt="You are an agent that can perform basic mathematical operations using tools."
)

# configure a context to work with our workflow
ctx = Context(workflow)

async def main():
    response = await workflow.run(user_msg="Hi, my name is Laurie!",ctx=ctx)
    print(response)

    response2 = await workflow.run(user_msg="What's my name?",ctx=ctx)
    print(response2)

    # 提取对话历史,可以用于持久化存储
    ctx_dict = ctx.to_dict(serializer=JsonSerializer())
    print(ctx_dict)

    # 设置对话历史，可以用于回复历史对话
    restored_ctx = Context.from_dict(
        workflow, ctx_dict, serializer=JsonSerializer()
    )

    response3 = await workflow.run(user_msg="What's my name?",ctx=restored_ctx)
    print(response3)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())