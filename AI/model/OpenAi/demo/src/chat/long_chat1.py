from openai import OpenAI
# 淘宝购买的代理并未实现/v1/responses的跳转
client = OpenAI(base_url = "http://chatapi.littlewheat.com/v1",
                api_key  = "sk-q3UJCKRBHZlLEWr4PeQM5c4EKnB8hoPNuWCDz6ghCr5nlpfL")
# open ai 较高版本才有该方法
response = client.responses.create(
    model="gpt-4o-mini",
    input="tell me a joke",
)
print(response.output_text)
second_response = client.responses.create(
    model="gpt-4o-mini",
    previous_response_id=response.id,
    input=[{"role": "user", "content": "explain why this is funny."}],
)
print(second_response.output_text)