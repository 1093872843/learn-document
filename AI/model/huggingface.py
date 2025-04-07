# 如何使用hugging Face 仓库上提供的模型
from huggingface_hub import InferenceClient
from transformers import AutoTokenizer, AutoModelForCausalLM

# 在线API调用
def online_model():
    client = InferenceClient(
        provider="nebius",
        # https://huggingface.co/settings/tokens  需要设置令牌
        api_key="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    )
    completion = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-R1",
        messages=[
            {
                "role": "user",
                "content": "What is the capital of France?"
            }
        ],
        max_tokens=500,
    )
    print(completion.choices[0].message)

# 本地模型调用
def local_model():
    # 使用该代码会自动下载模型到本地
    model = AutoModelForCausalLM.from_pretrained("openai-community/gpt2")
    #gpt2模型无法直接识别自然语言，需要提前处理自然语言
    tokenizer = AutoTokenizer.from_pretrained("openai-community/gpt2")
    # 输入文本
    input_text = "Once upon a time"
    # 使用分词器将文本编码为输入
    inputs = tokenizer(input_text, return_tensors="pt")
    # 使用模型生成后续文本
    output = model.generate(inputs['input_ids'], max_length=50)
    # 解码生成的文本
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    print(generated_text)

local_model()