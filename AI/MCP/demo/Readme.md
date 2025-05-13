# MCP 调用案例

启动方式

```cmd

<!-- 该案例使用文件管道通讯，需要将脚本中的 路径地址修改为MCP Server的js执行文件地址 -->
pnpm run build
cd .\packages\mcp-client\
node ./build/index.js E:/private/AI/MCP/demo/packages/mcp-server-weather/build/index.js
```