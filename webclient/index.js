const puppeteer = require('puppeteer');

const webClient = {
  browser: null,
  listPage: {},
};

webClient.start = async function () {
  try {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    LOG('Khởi tạo puppeteer');
  } catch (error) {
    ERROR('Không thể khởi tạo webclient do', error);
  }
  return this.browser;
};
webClient.getPage = async function (name) {
  if (this.listPage[name]) return this.listPage[name];
  if (!this.browser) return ERROR('Chưa start webclient');
  let page;
  try {
    page = await this.browser.newPage();
    this.listPage[name] = {
      startTime: Date.now(),
      default: page,
    };
  } catch (error) {
    ERROR('Không thể khởi tạo page do', error);
  }
  return this.listPage[name].default;
};
webClient.closePage = async function (name) {
  if (!this.listPage[name]) return true;
  try {
    await this.listPage[name].default.close();
    delete this.listPage[name];
  } catch (error) {
    ERROR('Không thể đóng page do', error);
  }
  return;
};
webClient.close = async function () {
  if (this.browser) {
    try {
      await this.browser.close();
    } catch (error) {
      ERROR('Không thể đóng webclient do', error);
    }
  }
  return;
};
webClient.login = async function () {};

module.exports = webClient;
