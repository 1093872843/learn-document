from llama_index.core import Settings,VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.huggingface import HuggingFaceLLM
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

def rag_demo():
    documents = SimpleDirectoryReader("./data").load_data()
    embed_model = HuggingFaceEmbedding(model_name='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    model_path = r"D:\huggingface_cache\models--deepseek-ai--DeepSeek-R1-Distill-Qwen-1.5B\snapshots\ad9f0ae0864d7fbcd1cd905e3c6c5b069cc8b562"
    llm = HuggingFaceLLM(model_name=model_path, tokenizer_name=model_path, model_kwargs={"trust_remote_code": True},
                         tokenizer_kwargs={"trust_remote_code": True})
    Settings.llm = llm
    Settings.embed_model  = embed_model
    index = VectorStoreIndex.from_documents(documents, embed_model=embed_model)
    query_engine = index.as_query_engine()
    response = query_engine.query("泰拉瑞亚的山顶上有什么")
    print(response)
