# 本案例 结合agent实现查询结构化数据库的功能
# 需要注意的是,该agent并不是直接访问数据库,而是通过agent生成SQL语句,由用户调用SQL语句实现
# 这样必然会存在固有风险,所以需要尽可能的缩小账号权限以减小风险.
from langchain_deepseek import ChatDeepSeek
from typing import Tuple
import tiktoken
from typing_extensions import List, TypedDict,Annotated
from langchain import hub
from langchain_community.utilities import SQLDatabase
from langchain_community.tools.sql_database.tool import QuerySQLDatabaseTool
from langgraph.graph import START, StateGraph
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

# 连接数据库
db = SQLDatabase.from_uri(f"mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}")

# 用户问题转化SQL语句
# 定义graph节点数据结构
class State(TypedDict):
    question: str
    query: str
    result: str
    answer: str

# 使用官方提供的提示词模板,减少工作量
query_prompt_template = hub.pull("langchain-ai/sql-query-system-prompt")

# 定义接受的sql语句数据结构
class QueryOutput(TypedDict):
    """Generated SQL query."""
    query: Annotated[str, ..., "Syntactically valid SQL query."]

# 定义langGraph查询节点
def write_query(state: State):
    """Generate SQL query to fetch information."""
    prompt = query_prompt_template.invoke(
        {
            "dialect": db.dialect,
            "top_k": 10,
            "table_info": db.get_table_info(),
            "input": state["question"],
        }
    )
    structured_llm = model.with_structured_output(QueryOutput)
    result = structured_llm.invoke(prompt)
    return {"query": result["query"]}
# print(write_query({"question": "How many Employees are there?"}))
# 执行SQL语句
def execute_query(state: State):
    """Execute SQL query."""
    execute_query_tool = QuerySQLDatabaseTool(db=db)
    return {"result": execute_query_tool.invoke(state["query"])}
# 返回用户回答
def generate_answer(state: State):
    """Answer question using retrieved information as context."""
    prompt = (
        "Given the following user question, corresponding SQL query, "
        "and SQL result, answer the user question.\n\n"
        f'Question: {state["question"]}\n'
        f'SQL Query: {state["query"]}\n'
        f'SQL Result: {state["result"]}'
    )
    response = model.invoke(prompt)
    return {"answer": response.content}

# 生成langGraph编排流
# 根据问题生成SQL=》查询SQL=>查询结构返回指定结构的回答
graph_builder = StateGraph(State).add_sequence(
    [write_query, execute_query, generate_answer]
)
graph_builder.add_edge(START, "write_query")
graph = graph_builder.compile()
for step in graph.stream(
    {"question": "How many employees are there?"}, stream_mode="updates"
):
    print(step)