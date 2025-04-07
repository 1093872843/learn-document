# 使用预构工具的Agent应用
# 该案例使用了 Llamahub提供的Yahoo Finance Tool工具,它可以连接到雅虎财经，允许Agent能够访问公司的股票，新闻和财务数据
# https://llamahub.ai/l/tools/llama-index-tools-yahoo-finance?from=tools
# pip install llama-index-tools-yahoo-finance
from llama_index.core.agent.workflow import AgentWorkflow
from llama_index.tools.yahoo_finance import YahooFinanceToolSpec
from model.ollama_model import local_model
def multiply(a: float, b: float) -> float:
    """Multiply two numbers and returns the product"""
    print('multiply called')
    return a * b
def add(a: float, b: float) -> float:
    """Add two numbers and returns the sum"""
    print('add called')
    return a + b
finance_tools = YahooFinanceToolSpec().to_tool_list()
# 可以通过下列方式添加自定义的函数到已有工具中，
finance_tools.extend([multiply, add])
llm = local_model(model='qwen2.5:7b')
# 初始化工作流
workflow = AgentWorkflow.from_tools_or_functions(
    finance_tools,
    llm=llm,
    system_prompt="You are an agent that can perform basic mathematical operations using tools."
)

async def main():
    response = await workflow.run(user_msg="What's the current stock price of NVIDIA?")
    print(response)


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
