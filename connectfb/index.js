const WebSocket = require("ws");
const config = require("../config/ws.json");
const initWeb = require("../webclient/initWeb");

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", function open() {
  console.log("Connected to WebSocket server");
  ws.send("Hello from WebSocket client!");
});

ws.on("message", function incoming(message) {
  console.log("Received: %s", message);
});

class ConnectFb {
  constructor() {
    init();
  }
  async init() {
    this.client = await initWeb();
    this;
  }
}
