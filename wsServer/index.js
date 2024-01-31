const WebSocket = require('ws');
const net = require('net');
const { log } = require('console');

const app = {
  WebSocketSever: null,
  config: {},
  listSession: [],
};
app.setInstance = function ({ config, listSession }) {
  this.config = config;
  this.listSession = listSession;
};
app.start = async function () {
  let self = this;
  let isUser = await portInUse(self.config.port);
  if (isUser) {
    this.config.port++;
    return this.start();
  }
  return this.createServer();
};
app.createServer = function () {
  let wssever = new WebSocket.Server({ port: this.config.port });
  wssever.on('connection', (ws) => {
    ws.on('message', function (message) {
      if (message instanceof Buffer) message = message.toString('utf-8');

      app.action(message);
    });
  });
  this.WebSocketSever = wssever;
  return this.WebSocketSever;
};
app.close = function () {
  if (this.WebSocketSever) this.WebSocketSever.close();
  this.WebSocketSever = null;
};
app.action = function (message) {
  console.log(message);
};

function portInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => {
      resolve(true);
    });
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
}
module.exports = app;
