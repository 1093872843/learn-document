const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

console.log('WebSocket 服务器运行在 ws://localhost:8080');

server.on('connection', (socket) => {
    console.log('客户端已连接');

    // 监听客户端发送的消息
    socket.on('message', (message) => {
        console.log(`收到消息: ${message}`);
        // 回复客户端
        socket.send(`服务器收到: ${message}`);
    });

    // 处理断开连接
    socket.on('close', () => {
        console.log('客户端断开连接');
    });
});