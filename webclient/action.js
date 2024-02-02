function action({ page, ws }) {
  this.page = page;
  this.ws = ws;
}

let aPrototype = action.prototype;

aPrototype.loginByAccount = async function ({ username, password, _2fa }) {
  await page.goto('https://facebook.com/', { waitUntil: ['networkidle2'] });
  await page.type('#email', account.username);
  await page.type('#pass', account.password);
  await page.keyboard.press('Enter');
  var status = checkUrl(page);
};

module.exports = action;
