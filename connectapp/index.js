const configWs = require("../config/ws.json");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: configWs.port });
const switchType = {
  1: createUser,
};

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    if (typeof message === "object") {
    }
  });
});
function createUser({ message }) {}
