# 本案例 结合agent实现提取文本摘要
# 核心问题是如何将文档传递到LLM上下文窗口
from langchain_deepseek import ChatDeepSeek
from typing import Tuple
import tiktoken
from langchain_community.document_loaders import WebBaseLoader
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

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
loader = WebBaseLoader("https://baike.baidu.com/item/%E9%87%91%E5%AD%97%E5%A1%94/1092")
docs = loader.load()
# print(docs)

# --------------摘要方法一---一次性总结-----------
# 使用create_stuff_documents_chain进行一次性总结，特别适合单次上下文内容token量比较多的模型
# 定义提示此模板
prompt = ChatPromptTemplate.from_messages(
    [("system", "Write a concise summary of the following:\\n\\n{context}")]
)
# 实例化create_stuff_documents_chain
chain = create_stuff_documents_chain(model, prompt)
# 调用模型
result = chain.invoke({"context": docs})
print("一次性总结"+result)
#------------------------------------------
