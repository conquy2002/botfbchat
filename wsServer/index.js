const WebSocket = require('ws');
const net = require('net');

const app = {
  WebSocketSever: null,
  config: {},
  listAccount: [],
  listPage: [],
};
app.setInstance = function ({ config, listAccount }) {
  this.config = config;
  this.listAccount = listAccount;
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
      try {
        message = JSON.parse(message);
      } catch (e) {}
      Number.isNaN(message * 1) || (message = message * 1);
      app.action(ws, message);
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
  if (getType(message) === 'Object') {
    const listFunctionType = {
      1: createUser,
    };
    let action = listFunctionType[message.type];
    listFunctionType[action] && listFunctionType[action](message);
  }
};

app.getToken = function (usename, password, userId) {
  let token = this.listAccount.some((a) => a.userId == userId || a.usename == usename)?.token;
  if (token) return token;
  this.listAccount.push({
    usename: usename,
    password: password,
  });
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
