# 简单的Agent应用
# 该案例使用了自定义multiply函数工具和add函数工具用于工具调用
# Agent将决定根据工具的名称,参数和docString来确定工具的功能以及他是否因该被本次任务调用,因此对于函数的描述非常重要。
from llama_index.core.agent.workflow import AgentWorkflow
from model.ollama_model import local_model
def multiply(a: float, b: float) -> float:
    """Multiply two numbers and returns the product"""
    print('multiply called')
    return a * b
def add(a: float, b: float) -> float:
    """Add two numbers and returns the sum"""
    print('add called')
    return a + b

llm = local_model(model='qwen2.5:7b')
# 初始化工作流
workflow = AgentWorkflow.from_tools_or_functions(
    # 工具
    [multiply, add],
    # 大模型
    llm=llm,
    # 系统Prompt
    system_prompt="You are an agent that can perform basic mathematical operations using tools.",
)

async def main():
    response = await workflow.run(user_msg="What is 20+(2*4)?")
    print(response)


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
