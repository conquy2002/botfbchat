const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Mở cửa sổ Chrome visible
    defaultViewport: null, // Mở cửa sổ Chrome với kích thước mặc định
    args: ['--start-maximized'] // Mở cửa sổ Chrome với kích thước lớn nhất
  });

  const page = await browser.newPage();

  // Đường dẫn tới extension CRX hoặc thư mục của extension
  const extensionPath = '/path/to/extension';

  // Cài đặt extension vào trình duyệt
  await page.goto('chrome://extensions');
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('text=Developer mode')
  ]);
  await fileChooser.accept([extensionPath]);

  // Mở một trang web bất kỳ sau khi đã cài đặt extension
  await page.goto('https://www.example.com');

  // Đóng trình duyệt sau một khoảng thời gian nhất định
  setTimeout(async () => {
    await browser.close();
  }, 10000); // Thời gian đóng trình duyệt: 10 giây
})();
