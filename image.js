import puppeteer from "puppeteer";
import { writeFile } from "fs";
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.unsplash.com");

  page.on("response", async res => {
    const headers = res.headers();
    const url = new URL(res.url());
    if (
      headers["content-type"]?.includes("image/avif") &&
      url.href.startsWith("https://images.unsplash.com/photo-") &&
      headers["content-length"] > 30000
    ) {
      console.log(url.pathname);
      await res
        .buffer()
        .then(async buffer => {
          await writeFile(`images/${url.pathname}.avif`, buffer, err => {
            if (err) {
              throw err;
            }
            console.log("written");
          });
        })
        .catch(err => {
          throw err;
        });
    }
  });

  const btn = await page.waitForSelector(
    "button[data-test='nav-bar-search-form-button']"
  );

  await page.type("input[data-test='nav-bar-search-form-input']", "Mountains");

  await Promise.all([page.waitForNavigation(), btn.click()]);
  await page.waitForNetworkIdle();
  await page.screenshot({ path: "screens/unsplash.jpg", fullPage: true });

  await browser.close();
})();
