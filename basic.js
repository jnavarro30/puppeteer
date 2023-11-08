import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = "https://chapters.indigo.ca";
  await page.goto(url);
  const content = await page.content();

  console.log(content);

  await page.screenshot({ path: "screens/ss1.jpg", fullPage: true });
  await page.screenshot({ path: "screens/ss2.jpg" });
  await browser.close();
})();
