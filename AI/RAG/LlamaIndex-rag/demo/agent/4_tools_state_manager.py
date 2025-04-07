# LlamaIndext允许工具访问历史上下文信息.这意味着您可以从上下文中设置和检索变量并在工具中使用它们，或者在工具之间传递信息。
# AgentWorkflow 可以使用Context实例内置的一个state变量存储消息.
from model.ollama_model import local_model
from llama_index.core.agent.workflow import AgentWorkflow
from llama_index.tools.yahoo_finance import YahooFinanceToolSpec
from llama_index.core.workflow import Context

llm = local_model(model='qwen2.5:7b')

# 定义工具时,第一个参数必须是Context状态管理实例
async def set_name(ctx: Context, name: str) -> str:
    """save user's name"""
    # 该函数的功能为状态添加了一个名称
    state = await ctx.get("state")
    state["name"] = name
    await ctx.set("state", state)
    return f"Name set to {name}"

workflow = AgentWorkflow.from_tools_or_functions(
    [set_name],
    llm=llm,
    system_prompt="You are a helpful assistant that can set a name.",
    initial_state={"name": "unset"},
)

async def main():
    ctx = Context(workflow)

    # check if it knows a name before setting it
    response = await workflow.run(user_msg="What's my name?", ctx=ctx)
    print(str(response))

    # set the name using a tool
    response2 = await workflow.run(user_msg="My name is Laurie", ctx=ctx)
    print(str(response2))

    # retrieve the value from the state directly
    state = await ctx.get("state")
    print("Name as stored in state: ",state["name"])

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())