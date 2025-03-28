from openai import OpenAI

# 使用openAI连接Ollama本地模型
def connect_ollama_local():
    client = OpenAI(api_key="ollama", base_url="http://localhost:11434/v1")
    completion = client.chat.completions.create(model='deepseek-r1:1.5b', messages=[{"role":"user","content":"你好"}])
    print(completion)

