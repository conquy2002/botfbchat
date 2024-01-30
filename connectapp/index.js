const configWs = require("../config/ws.json");
const WebSocket = require("ws");
const action = require("./action");
const session = require("./session")();

const wss = new WebSocket.Server({ port: configWs.port });

wss.on("connection", function connection(ws) {
  const switchType = action({ ws: ws, session: session });

  ws.on("message", function incoming(message) {
    message = message.toString();
    console.log(message);
    if (typeof message === "object") switchType[message.type] && switchType[message.type](message);
    console.log(session.listSession);
  });
});
