import OpenAI from "openai";
const apiKey = "sk-0b7ee68a5bc047248e00a5bcc0fd6440"
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: apiKey
});

// 提问
async function sendMessage(value) {
    const data = {
        model: "deepseek-chat",
        ...value
    }
    console.log('data', data);
    let response = await openai.chat.completions.create(data)
    return response.choices[0].message
}


//预定义函数，查询食谱
function getFood() {
    console.log('获取食谱函数被调用');
    return '麻婆豆腐'
}
// 预定义函数，查询天气
function getWeather(location) {
    console.log('获取天气函数被调用');
    return '24℃'
}

// function-call
export async function callFun(question) {
    // 定义函数描述，这个很重要，AI根据函数描述来决定问题所需要使用的函数
    const tools = [
        {
            "type": "function",
            "function": {
                // 函数名称
                "name": "getWeather",
                // 函数描述
                "description": "Get weather of an location, the user shoud supply a location first",
                // 函数所需要的参数
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
    // AI返回的回答中会告知需要调用的函数名称，我们需要手动调用该函数。
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
    // 将函数返回结果连同之前的上下文一起返回给AI再次询问得到结果。
    messages.push(message)
    console.log('callResp', callResp);
    messages.push({ "role": "tool", "tool_call_id": tool.id, "content": callResp })
    message = await sendMessage({ messages })
    console.log('值');
    console.log(message.content);
}