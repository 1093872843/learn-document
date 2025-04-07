# 如何在LlamaIndex中使用Hugging Face上的模型
from llama_index.core.base.llms.types import ChatMessage
from llama_index.core.llms.function_calling import FunctionCallingLLM
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.huggingface import HuggingFaceLLM
from huggingface_hub import InferenceClient
from llama_index.core.llms import CustomLLM,  CompletionResponse, CompletionResponseGen,LLMMetadata
from typing import Any, Sequence, Optional, Union, List, Dict


# 直接使用hugging face 提供的在线API
def online_hugging_api():
    client = InferenceClient(
        provider="sambanova",
        api_key="hf_xxxxxxxxxxxxxxxxxxxxxxxx"
        model = "openai-community/gpt2"
    )
    llm = HuggingFaceAPILLM(client,256)
    return llm

def online_model(model='openai-community/gpt2'):
    # 该函数第一次运行会下载模型，耗时较长
    # 未启用GPU会导致使用GPU处理的模型速度巨慢
    llm = HuggingFaceLLM(model_name=model,model_kwargs={"trust_remote_code":True})
    resp = llm.complete('你好')
    print(resp)
    return llm

def local_model():
    # 未启用GPU会导致使用GPU处理的模型速度巨慢
    model_path=r"D:\huggingface_cache\models--deepseek-ai--DeepSeek-R1-Distill-Qwen-1.5B\snapshots\ad9f0ae0864d7fbcd1cd905e3c6c5b069cc8b562"
    llm = HuggingFaceLLM( model_name=model_path,tokenizer_name=model_path, model_kwargs={"trust_remote_code":True}, tokenizer_kwargs={"trust_remote_code":True})
    resp = llm.complete('你好')
    print(resp)
    return llm

# 线上使用HuggingFace的模型
def online_embed_model(model='sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2'):
    embed_model = HuggingFaceEmbedding(model_name=model)
    # embeddings = embed_model.get_text_embedding("Hello World!")
    # print(len(embeddings))
    # print(embeddings[:5])
    return embed_model

# 使用本地下载的HuggingFace的模型
def local_embed_model():
    model_path = r"D:\huggingface_cache\models--sentence-transformers--paraphrase-multilingual-MiniLM-L12-v2\snapshots\86741b4e3f5cb7765a600d3a3d55a0f6a6cb443d"
    embed_model = HuggingFaceEmbedding(model_name=model_path)
    embeddings = embed_model.get_text_embedding("Hello World!")
    print(len(embeddings))
    print(embeddings[:5])

# 自定义模型,访问hugging线上模型 api
class HuggingFaceAPILLM(CustomLLM,FunctionCallingLLM):


    model_name: str = "Gemma"
    model: Any = None

    def __init__(self, model, num_output):
        super().__init__()
        self.model = model

    def complete(self, prompt: str, **kwargs: Any) -> CompletionResponse:
        completion =self.model.chat.completions.create([
            {
                "role": "user",
                "content": prompt
            }
        ])
        return CompletionResponse(text=completion.choices[0].message.content)

    def stream_complete(self, prompt: str, **kwargs: Any) -> CompletionResponseGen:
        response = ""
        for token in self.model.generate(prompt):
            response += token
            yield CompletionResponse(text=response, delta=token)

    @property
    def metadata(self) -> LLMMetadata:
        """Get LLM metadata."""
        return LLMMetadata(
            model_name=self.model_name,
        )

online_model()