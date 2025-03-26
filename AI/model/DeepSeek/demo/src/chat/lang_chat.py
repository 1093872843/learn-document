from openai import OpenAI
# 通过使用交替user和assistant消息，您可以在对模型的一次请求中捕获对话的先前状态。
# 要在生成的响应之间手动共享上下文，请将模型的先前响应输出作为输入，并将该输入附加到下一个请求。

# 下例通过手动传递之前的历史对话内容到上下文实现多轮对话
# 优势: 实现简单，支持所有的模型
# 缺点: 随着对话轮次增多，可能导致内容超过模型的上下文限制
client = OpenAI(api_key="sk-0b7ee68a5bc047248e00a5bcc0fd6440", base_url="https://api.deepseek.com")
history = [
    {
        "role": "user",
        "content": "告诉我一个笑话"
    }
]
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=history
)
print(response.choices[0].message.content)
history.append(response.choices[0].message)
history.append({ "role": "user", "content": "告诉我另一个" })
second_response = client.chat.completions.create(
    model="deepseek-chat",
    messages=history,
)
print(second_response.choices[0].message.content)