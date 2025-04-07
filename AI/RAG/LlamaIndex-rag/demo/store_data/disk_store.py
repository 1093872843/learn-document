# 磁盘存储
from llama_index.core import Settings,VectorStoreIndex, SimpleDirectoryReader,StorageContext, load_index_from_storage
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from model.huggingface_model import online_hugging_api


# 从磁盘中加载数据
def load_doc():
    llm = online_hugging_api()
    Settings.llm = llm
    embed_model = HuggingFaceEmbedding(model_name='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    Settings.embed_model = embed_model
    # 重新加载磁盘中的数据
    storage_context = StorageContext.from_defaults(persist_dir=r"D:\testData")
    index = load_index_from_storage(storage_context)
    query_engine = index.as_query_engine()
    response = query_engine.query("泰拉瑞亚的山顶上有什么")
    print(response)

# 将数据持久化存储在磁盘中
def store_doc():
    documents = SimpleDirectoryReader("../data").load_data()
    embed_model = HuggingFaceEmbedding(model_name='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    Settings.embed_model = embed_model
    # 转换文档到向量索引并存储
    index = VectorStoreIndex.from_documents(documents, embed_model=embed_model)
    index.storage_context.persist(persist_dir=r"D:\testData")

load_doc()