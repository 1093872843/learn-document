import sys
import json
from openai import OpenAI

client = OpenAI(api_key="sk-0b7ee68a5bc047248e00a5bcc0fd6440", base_url="https://api.deepseek.com")

def chat(messages, model='deepseek-chat', **kwargs):
    if messages is None:
        raise ValueError("messages 参数是必需的")
    completion = client.chat.completions.create(model=model, messages=messages, **kwargs)
    return completion

# 发送文本
def send_text():
    resp = chat([
        {"role": "user",
         "content": "Write a one-sentence bedtime story about a unicorn."}
    ])
    return resp.choices[0].message.content

# 推理
def reasoning_model():
    messages = [{"role": "user", "content": "9.11 和 9.8, 哪一个更大"}]
    response = client.chat.completions.create(
        model="deepseek-reasoner",
        messages=messages,
        stream=True
    )
    reasoning_content = ""
    content = ""
    for chunk in response:
        if chunk.choices[0].delta.reasoning_content:
            # 思维链内容
            reasoning_content += chunk.choices[0].delta.reasoning_content
            print(chunk.choices[0].delta.reasoning_content,end='')
            sys.stdout.flush()
        elif  chunk.choices[0].delta.content:
            # 最终结果
            content += chunk.choices[0].delta.content
        else:
            print("")

    print(content)

# 对话前缀续写
# 对话前缀续写（Prefix Completion 或 Prefix Continuation）通常指的是给定一部分对话（前缀），让模型基于这个上下文继续生成合理的对话。
# 使用对话前缀续写时，用户需确保 messages 列表里最后一条消息的 role 为 assistant并且 prefix 参数为 True。
def use_prefix_completion():
    client = OpenAI(
        api_key="sk-0b7ee68a5bc047248e00a5bcc0fd6440",
        base_url="https://api.deepseek.com/beta",
    )
    messages = [
        {"role": "user", "content": "Please write quick sort code"},
        # 通过添加【```python\n】,强制让模型用python语法输出后续内容
        {"role": "assistant", "content": "```python\n", "prefix": True}
    ]
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages,
        stop=["```"],
    )
    print(response.choices[0].message.content)

# json输出
# 设置 response_format 参数为 {'type': 'json_object'}。
# 用户传入的 system 或 user prompt 中必须含有 json 字样，并给出希望模型输出的 JSON 格式的样例，以指导模型来输出合法 JSON。
def format_output():
    system_prompt = """
    The user will provide some exam text. Please parse the "question" and "answer" and output them in JSON format. 

    EXAMPLE INPUT: 
    Which is the highest mountain in the world? Mount Everest.

    EXAMPLE JSON OUTPUT:
    {
        "question": "Which is the highest mountain in the world?",
        "answer": "Mount Everest"
    }
    """

    user_prompt = "Which is the longest river in the world? The Nile River."

    messages = [{"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}]

    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages,
        response_format={
            'type': 'json_object'
        }
    )
    print(json.loads(response.choices[0].message.content))


# 工具调用
def use_tools():
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "Get weather of an location, the user shoud supply a location first",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city and state, e.g. San Francisco, CA",
                        }
                    },
                    "required": ["location"]
                },
            }
        },
    ]
    messages = [{"role": "user", "content": "How's the weather in Hangzhou?"}]
    response =  client.chat.completions.create(
        model="deepseek-chat",
        messages=messages,
        tools=tools
    )
    tool = response.choices[0].message.tool_calls[0]
    print(tool)
    messages.append(response.choices[0].message)
    messages.append({"role": "tool", "tool_call_id": tool.id, "content": "24℃"})
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages,
        tools=tools
    )
    print(f"Model>\t {response.choices[0].message.content}")

# 连接Ollama本地模型
def connect_ollama_local():
    client = OpenAI(api_key="ollama", base_url="http://localhost:11434/v1")
    completion = client.chat.completions.create(model='deepseek-r1:1.5b', messages=[{"role":"user","content":"你好"}])
    print(completion)