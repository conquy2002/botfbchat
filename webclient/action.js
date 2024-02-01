function checkUrl(page) {
  var url = page.url();
  if (url.indexOf("login") > -1) return "login";
  if (url.indexOf("checkpoint/?next") > -1) return "2fa";
}

action.loginByAccount = async function (page, { username, password, _2fa }) {
  await page.goto("https://facebook.com/", { waitUntil: ["networkidle2"] });
  await page.type("#email", account.username);
  await page.type("#pass", account.password);
  await page.keyboard.press("Enter");
  try {
    await page.waitForNavigation();
  } catch (e) {
    ERROR("Lỗi mạng của bạn yếu :3 " + e.stack);
  }
  var status = checkUrl(page);
};

module.exports = action;
