const puppeteer = require("puppeteer");

module.exports = async function () {
  const listPage = {};
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const createPage = async (name, { cookie }) => {
    const page = await browser.newPage();
    cookie && page.setCookie(cookie);
    return (listPage[name] = {
      startTime: Date.now(),
      page,
    });
  };

  const getPage = (name) => listPage[name];
  const closePage = (name) => listPage[page] && listPage[name].close();
  const closeWeb = () => browser.close();
  return {
    createPage,
    closePage,
    closeWeb,
    getPage,
  };
};
