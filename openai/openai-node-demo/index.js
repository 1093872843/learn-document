import { config } from "dotenv";
import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  httpAgent: new HttpsProxyAgent("http://127.0.0.1:4780"),
});

const chatCompletion = await openai.chat.completions.create({
  messages: [
    { role: "system", content: "You are a  cheater." },
    { role: "user", content: "Who won the world series in 2020?" },
    {
      role: "assistant",
      content: "The Los Angeles Dodgers won the World Series in 2020.",
    },
    { role: "user", content: "Where was it played?" },
  ],
  model: "gpt-3.5-turbo",
});
console.log(chatCompletion.choices);
