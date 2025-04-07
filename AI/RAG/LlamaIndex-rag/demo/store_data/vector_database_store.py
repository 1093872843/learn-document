# 向量数据库存储
# 本例我们使用开源向量存储Chroma
import chromadb
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader,Settings
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
from model.huggingface_model import online_hugging_api
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

# 重新加载文档
def load_doc():
    llm = online_hugging_api()
    Settings.llm = llm
    embed_model = HuggingFaceEmbedding(model_name='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    Settings.embed_model = embed_model
    # 初始化 ChromaDB 持久化存储
    db = chromadb.PersistentClient(path="../chroma_db")
    # 获取集合
    chroma_collection = db.get_or_create_collection("quickstart")
    # 设置LlamaIndex 使用 ChromaDB 作为向量存储
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)
    # 读取向量
    index = VectorStoreIndex.from_vector_store(
        vector_store, storage_context=storage_context
    )
    # create a query engine
    query_engine = index.as_query_engine()
    response = query_engine.query("泰拉瑞亚的山顶上有什么")
    print(response)

def store_doc():
    # 加载文档
    documents = SimpleDirectoryReader("../data").load_data()
    llm = online_hugging_api()
    Settings.llm = llm
    embed_model = HuggingFaceEmbedding(model_name='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    Settings.embed_model = embed_model
    # 初始化 ChromaDB 持久化存储
    db = chromadb.PersistentClient(path="../chroma_db")
    # 创建集合
    chroma_collection = db.get_or_create_collection("quickstart")
    # 设置LlamaIndex 使用 ChromaDB 作为向量存储
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)
    # 创建索引
    index = VectorStoreIndex.from_documents(
        documents, storage_context=storage_context
    )

load_doc()