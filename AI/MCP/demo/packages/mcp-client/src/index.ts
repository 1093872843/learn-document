// 
import OpenAI from "openai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
// 使用标准管道通信
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";

import dotenv from "dotenv";
dotenv.config(); // load environment variables from .env



const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

class MCPClient {
  private mcp: Client;
  private deepseek: any;
  private transport: StdioClientTransport | null = null;
  private tools: any[] = [];

  constructor() {
    // Initialize Anthropic client and MCP client
    this.deepseek = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: DEEPSEEK_API_KEY
    })
    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }

  async connectToServer(serverScriptPath: string) {
    /**
     * Connect to an MCP server
     *
     * @param serverScriptPath - Path to the server script (.py or .js)
     */
    try {
      // Determine script type and appropriate command
      const isJs = serverScriptPath.endsWith(".js");
      const isPy = serverScriptPath.endsWith(".py");
      if (!isJs && !isPy) {
        throw new Error("Server script must be a .js or .py file");
      }
      const command = isPy
        ? process.platform === "win32"
          ? "python"
          : "python3"
        : process.execPath;

      // Initialize transport and connect to server
      this.transport = new StdioClientTransport({
        command,
        args: [serverScriptPath],
      });
      console.log('command',command);
      
      this.mcp.connect(this.transport);

      // List available tools
      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => {
        console.log(JSON.stringify(tool.inputSchema));
        return {
          type: "function",
          function:{
            name: tool.name,
            description: tool.description,
            parameters: tool.inputSchema,
          }
   
        };
      });
      
      console.log(
        "Connected to server with tools:",
        this.tools.map(({ name }) => name),
      );
    } catch (e) {
      console.log("Failed to connect to MCP server: ", e);
      throw e;
    }
  }

  async processQuery(query: string) {
    /**
     * Process a query using Claude and available tools
     *
     * @param query - The user's input query
     * @returns Processed response as a string
     */
    const messages: any[] = [
      {
        role: "user",
        content: query,
      },
    ];

    // Initial Claude API call
    const response = await this.deepseek.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 1000,
      messages,
      tools: this.tools,
    });

    // Process response and handle tool calls
    const finalText = [];
    const toolResults = [];
    const responseMessage = response.choices[0].message

    if (responseMessage.content) {
      finalText.push(responseMessage.content);
    } else if (responseMessage.tool_calls.length>0) {
      for (const tool of responseMessage.tool_calls) {
      // Execute tool cal
      const toolName = tool.function.name;
      const toolArgs = tool.function.arguments as string;
      const result = await this.mcp.callTool({
        name: toolName,
        arguments: JSON.parse(toolArgs) ,
      });
      toolResults.push(result);
      finalText.push(
        `[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`,
      );

      // Continue conversation with tool results
      messages.push({
        role: "assistant",
        tool_calls:responseMessage.tool_calls,
      })
      messages.push({
        role: "tool",
        tool_call_id:tool.id,
        content: (result.content as Array<any>)[0].text as string,
      });
      console.log(messages);
      
      
      // // Get next response from Claude
      const response = await this.deepseek.chat.completions.create({
        model: "deepseek-chat",
        max_tokens: 1000,
        messages,
      });
   
      finalText.push(
        response.choices[0].message.content
      );
      console.log('finalText');
      console.log(finalText);
    }
  }
    return finalText.join("\n");
  }

  async chatLoop() {
    /**
     * Run an interactive chat loop
     */
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      console.log("\nMCP Client Started!");
      console.log("Type your queries or 'quit' to exit.");

      while (true) {
        const message = await rl.question("\nQuery: ");
        if (message.toLowerCase() === "quit") {
          break;
        }
        const response = await this.processQuery(message);
        console.log('结果如下');
        
        console.log("\n" + response);
      }
    } catch(e){
      console.error(e);
    }finally {
      rl.close();
    }
  }

  async cleanup() {
    /**
     * Clean up resources
     */
    await this.mcp.close();
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.log("Usage: node build/index.js <path_to_server_script>");
    return;
  }
  const mcpClient = new MCPClient();
  try {
    await mcpClient.connectToServer(process.argv[2]);
    await mcpClient.chatLoop();
  } finally {
    await mcpClient.cleanup();
  console.log('程序退出');
  
    process.exit(0);
  }
}

main();
