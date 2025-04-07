# 检索文档到向量存储
from llama_index.core import Settings,VectorStoreIndex, SimpleDirectoryReader
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from model.huggingface_model import online_hugging_api


#使用 SimpleDirectoryReader 加载#
#最容易使用的阅读器 SimpleDirectoryReader，它可以从给定目录中的每个文件创建文档。可以读取各种格式，包括 Markdown、PDF、Word 文档、PowerPoint 演示文稿、图像、音频和视频。
def retrieved_doc():
    documents = SimpleDirectoryReader("../data").load_data()
    llm = online_hugging_api()
    Settings.llm = llm
    embed_model = HuggingFaceEmbedding(model_name='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    Settings.embed_model = embed_model
    # 转换文档到向量索引并存储
    # 默认该存储存储在内存中
    index = VectorStoreIndex.from_documents(documents, embed_model=embed_model)
    query_engine = index.as_query_engine()
    response = query_engine.query("泰拉瑞亚的山顶上有什么")
    print(response)

retrieved_doc()