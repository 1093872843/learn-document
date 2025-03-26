import OpenAI from "openai";
const apiKey = "sk-0b7ee68a5bc047248e00a5bcc0fd6440"
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: apiKey
});

async function sendMessage(value) {
    const data = {
        model: "deepseek-chat",
        ...value
    }
    console.log('data', data);
    let response = await openai.chat.completions.create(data)
    return response.choices[0].message
}
//** 文本单次问答*/
export async function send_text(question) {
    let message = await sendMessage({ messages: [{ role: "system", content: question }] })
    console.log(message.content);
}

/** 多轮对话
 使用 DeepSeek /chat/completions API 进行多轮对话。
 DeepSeek /chat/completions API 是一个“无状态” API，即服务端不记录用户请求的上下文，用户在每次请求时，需将之前所有对话历史拼接好后，传递给对话 API。
*/
export async function chat() {
    let messages = [{ "role": "user", "content": "What's the highest mountain in the world?" }]
    let message = await sendMessage({ messages })
    messages.push(message)
    console.log(`Messages Round 1: ${JSON.stringify(messages)}`)

    //  Round 2
    messages.push({ "role": "user", "content": "What is the second?" })
    message = await sendMessage({ messages })

    messages.push(message)
    console.log(`Messages Round 2: ${JSON.stringify(messages)}`)
}

//** 调用外部函数*/
    // 实际函数
function getFood() {
    console.log('获取食谱函数被调用');
    return '麻婆豆腐'
}
    // 实际函数
function getWeather(location) {
    console.log('获取天气函数被调用');
    return '24℃'
}
    // 调用函数
export async function useTools(question) {
    const tools = [
        {
            "type": "function",
            "function": {
                "name": "getWeather",
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
        {
            "type": "function",
            "function": {
                "name": "getFood",
                "description": "Get the best famous food of an country, the user shoud supply a country first",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "country": {
                            "type": "string",
                            "description": "The country, e.g. China, US",
                        }
                    },
                    "required": ["country"]
                },
            }
        },
    ]
    let messages = [{ "role": "user", "content": question }]
    let message = await sendMessage({ messages, tools })
    let tool = message.tool_calls[0]
    console.log('tool', JSON.stringify(tool));
    // 调用函数
    let funcName = tool.function.name
    console.log(funcName);
    let callResp = null
    switch (funcName) {
        case 'getFood':
            callResp = getFood()
            break;
        case 'getWeather':
            callResp = getWeather()
            break;
        default:
            break;
    }
    messages.push(message)
    console.log('callResp', callResp);
    messages.push({ "role": "tool", "tool_call_id": tool.id, "content": callResp })
    message = await sendMessage({ messages })
    console.log('值');
    console.log(message.content);
}

//** */
