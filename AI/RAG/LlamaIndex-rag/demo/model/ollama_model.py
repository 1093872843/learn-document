# 使用本地下载的Ollama的模型
from llama_index.llms.ollama import Ollama

def local_model(model='deepseek-r1:1.5b'):
    llm = Ollama(model=model,request_timeout=360.0)
    resp = llm.complete('你好')
    print(resp)
    return llm

