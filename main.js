//init
require("./utils");
const CONFIG = require("./config");
const WebSocket = require("ws");
//tạo 1 wssever
const WebSocketSever = new WebSocket.Server({ port: CONFIG.ws.port });
LOG(`Khởi tạo websocket server tại ws://localhost:${CONFIG.ws.port}`);
WebSocketSever.on("connection", (ws) => {
  LOG(`Đã có 1 client connect`);
  ws.on("close", function () {
    LOG(`Đã có 1 client connect`);
  });
});
