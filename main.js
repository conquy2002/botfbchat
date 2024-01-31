//init
require('./utils');
const CONFIG = require('./config');
const listSession = require('./database/session.json');
const wssever = require('./wsServer');

const app = {
  timecheck: null,
  startTime: Date.now(),
};
app.start = async function () {
  console.clear();
  //tạo 1 wssever
  wssever.setInstance({
    config: CONFIG.ws,
    listSession: listSession,
  });
  await wssever.start();
  LOG(`Khởi tạo websocket server tại ws://localhost:${CONFIG.ws.port}`);

  this.timecheck = setInterval(function () {}, CONFIG.core.timecheck * 1000);
};
app.reset = function () {
  clearInterval(this.timecheck);
  wssever.close();
  startTime = Date.now();
};
app.start();
