from openai import OpenAI
from pydantic import BaseModel
from typing import List
import openai
import base64
import requests
from io import BytesIO
from pathlib import Path
# 安装依赖 OpenAI
client = OpenAI(base_url = "http://chatapi.littlewheat.com/v1",
                api_key  = "sk-q3UJCKRBHZlLEWr4PeQM5c4EKnB8hoPNuWCDz6ghCr5nlpfL")

def chat(messages, model='gpt-4o', **kwargs):
    if messages is None:
        raise ValueError("messages 参数是必需的")
    completion = client.chat.completions.create(model=model, messages=messages, **kwargs)
    return completion

# 发送文本
# https://platform.openai.com/docs/guides/text?api-mode=chat
def send_text():
    resp = chat([
        {"role": "user",
        "content": "Write a one-sentence bedtime story about a unicorn."}
    ])
    return resp.choices[0].message.content

# 发送图片
# https://platform.openai.com/docs/guides/images?api-mode=chat&format=url
def send_img():
    # 图片类型支持.png,.jpeg,.jpg,webp,.gif;
    # 每张图片最大20M,分辨率在512*512~768*2000
    # 无水印，无文字，禁止 NSFW 内容
    resp = chat([
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What's in this image?"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                        },
                    },
                ],
            }
        ],"gpt-4o-mini")
    return resp.choices[0].message.content
# 文本生成语音
def transform_audio():
    completion = client.chat.completions.create(
        model="gpt-4o-audio-preview",
        modalities=["text", "audio"],
        audio={"voice": "alloy", "format": "wav"},
        messages=[
            {
                "role": "user",
                "content": "Is a golden retriever a good family dog?"
            }
        ]
    )
    print(completion.choices[0])
    wav_bytes = base64.b64decode(completion.choices[0].message.audio.data)
    with open("dog.wav", "wb") as f:
        f.write(wav_bytes)
# 调用网络搜索
def use_web_search():
   #  确保你的账号可以使用这个模型
   resp = chat(
        messages=[
           {
               "role": "user",
               "content": "What was a positive news story from today?",
           }
       ],
        model="gpt-4o-search-preview"
    )
   return resp.choices[0].message.content
# 函数调用
# https://platform.openai.com/docs/guides/function-calling
def use_tools():
    # 定义函数描述,大模型需要根据函数描述确定需要调用的具体函数
    tools =  [{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current temperature for provided coordinates in celsius.",
            "parameters": {
                "type": "object",
                "properties": {
                    "latitude": {"type": "number"},
                    "longitude": {"type": "number"}
                },
                "required": ["latitude", "longitude"],
                "additionalProperties": False
            },
            "strict": True
        }
    }]
    # 此时模型并不会生成文本或音频，而是返回可以调用的函数说明。
    messages = [{"role": "user", "content": "What's the weather like in Paris today?"}]
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=tools,
    )
    # 模型返回可能的函数调用，这个调用可能是一个或多个，因此最佳做法是假设存在多个。
    print(resp.choices[0].message.tool_calls)
    for item in resp.choices[0].message.tool_calls:
        if item.function.name == 'get_weather':
            print('发现函数,手动调用,返回温度24摄氏度',item.function.name)
            # 假设手动调用函数后，返回温度24℃
            call_result = '24℃'
            # 将得到的结果接续放入下一次消息
            messages.append(resp.choices[0].message)  # append model's function call message
            messages.append({  # append result message
                "role": "tool",
                # 告知模型通过函数获取的数据和哪个函数调用对应
                "tool_call_id": item.id,
                #通过函数获取的数据
                "content": str(call_result)
            })
            completion_2 = client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                tools=tools,
            )
            print(completion_2.choices[0].message.content)


## 流式响应
def stream_resp():
    stream = chat(
        messages=[
            {
                "role": "user",
                "content": "Say 'double bubble bath' ten times fast.",
            },
        ],
        stream=True)
    # 流式传输聊天完成时，响应包含一个delta字段而不是一个message字段。
    for chunk in stream:
        print(chunk.choices[0].delta.content)
        print("****************")
# 结构化输出
## 定义输出结构
class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]
def format_output():
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": "Extract the event information."},
            {"role": "user", "content": "Alice and Bob are going to a science fair on Friday."},
        ],
        # 设置结构
        response_format=CalendarEvent,
    )
    print(completion.choices[0].message.parsed)
# 流式响应结构化输出
class EntitiesModel(BaseModel):
    attributes: List[str]
    colors: List[str]
    animals: List[str]
def stream_resp_format():
    with client.beta.chat.completions.stream(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Extract entities from the input text"},
                {
                    "role": "user",
                    "content": "The quick brown fox jumps over the lazy dog with piercing blue eyes",
                },
            ],
            response_format=EntitiesModel,
    ) as stream:
        for event in stream:
            if event.type == "content.delta":
                if event.parsed is not None:
                    # Print the parsed data as JSON
                    print("content.delta parsed:", event.parsed)
            elif event.type == "content.done":
                print("content.done")
            elif event.type == "error":
                print("Error in stream:", event.error)

    final_completion = stream.get_final_completion()
    print("Final completion:", final_completion)
# 流式响应工具调用
class GetWeather(BaseModel):
    city: str
    country: str
def stream_resp_with_ues_tools():
    with client.beta.chat.completions.stream(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": "What's the weather like in SF and London?",
                },
            ],
            tools=[
                openai.pydantic_function_tool(GetWeather, name="get_weather"),
            ],
            parallel_tool_calls=True,
    ) as stream:
        for event in stream:
            # print("content.delta parsed:", event.parsed)
            if event.type == "tool_calls.function.arguments.delta" or event.type == "tool_calls.function.arguments.done":
                print(event)

    print(stream.get_final_completion())

# 文件输入
# https://platform.openai.com/docs/guides/pdf-files?api-mode=chat#base64-encoded-files
# 仅具有视觉功能的 OpenAI 模型也可以接受 PDF 文件作为输入。以 Base64 编码数据或/v1/files通过API或仪表板将文件上传到端点后获得的文件 ID 的形式提供 PDF 。
def input_file():
    # 使用文件 API上传 PDF
    file = client.files.create(
        file=open("../resource/sample.pdf", "rb"),
        purpose="user_data"
    )

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "file",
                        "file": {
                            "file_id": file.id,
                        }
                    },
                    {
                        "type": "text",
                        "text": "文档中描述了什么",
                    },
                ]
            }
        ]
    )

    print(completion.choices[0].message.content)

# 创建文件向量，并使用模型进行搜索
# 文件搜索是Responses API中提供的工具,它使模型能够通过语义和关键字搜索检索以前上传的文件知识库中的信息
## 创建文件向量
def transform_file(client, file_path):
    if file_path.startswith("http://") or file_path.startswith("https://"):
        # Download the file content from the URL
        response = requests.get(file_path)
        file_content = BytesIO(response.content)
        file_name = file_path.split("/")[-1]
        file_tuple = (file_name, file_content)
        result = client.files.create(
            file=file_tuple,
            purpose="assistants"
        )
    else:
        # Handle local file path
        with open(file_path, "rb") as file_content:
            result = client.files.create(
                file=file_content,
                purpose="assistants"
            )
    file_id = result.id
    vector_store = client.vector_stores.create(
        name="knowledge_base"
    )
    client.vector_stores.files.create(
        vector_store_id=vector_store.id,
        file_id=file_id
    )
    return vector_store.id
## 搜索
def search_from_file():
    vector_store_id = transform_file(client, "https://cdn.openai.com/API/docs/deep_research_blog.pdf")
    # 使用Responses API 提供的工具搜索，注意Responses API只有较新版本的openAI支持。
    response = client.responses.create(
        model="gpt-4o-mini",
        input="What is deep research by OpenAI?",
        tools=[{
            "type": "file_search",
            "vector_store_ids": [vector_store_id]
        }]
    )
    print(response)

# 推理
# https://platform.openai.com/docs/guides/reasoning?api-mode=chat
# 推理模型，如 OpenAI o1 和 o3-mini，是使用强化学习训练的新型大型语言模型，可以执行复杂的推理。推理模型在回答之前会思考，在响应用户之前会产生很长的内部思路。推理模型在复杂问题解决、编码、科学推理和代理工作流的多步骤规划方面表现出色
def reasoning_model():
    prompt = """
    我想去泰国旅欧,都要做些什么
    """

    response = client.chat.completions.create(
        model="o3-mini",
        #reasoning_effort用于为模型提供指导，说明在创建提示的响应之前应该生成多少个推理标记。
        reasoning_effort="medium",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    print(response.choices[0].message.content)

# 生成图片
def create_img():
    response = client.images.generate(
        model="dall-e-3",
        prompt="a white siamese cat",
        size="1024x1024",
        quality="standard",
        n=1,
    )
    print(response.data[0].url)


