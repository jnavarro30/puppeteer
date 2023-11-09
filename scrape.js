import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import { writeFile } from "fs";

const keyword = "Mobile";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1600,
    height: 1000,
    deviceScaleFactor: 1,
  });
  await page.goto("https://www.algonquincollege.com");
  await page.screenshot({ path: "screens/algo.jpg" });

  const btn = await page.waitForSelector("button.programSearchButton");
  await page.type("input#programSearch", keyword, { delay: 100 });
  await btn.click();
  await page.waitForNavigation({ waitUntil: "load" });
  await page.waitForSelector("table.programFilterList");
  await page.screenshot({ path: "screens/program-list.jpg", fullPage: true });
  const data = await page.$$eval("table.programFilterList tbody tr", rows => {
    return rows
      .map(row => {
        if (row.classList.contains("odd") || row.classList.contains("even")) {
          const tds = row.querySelectorAll("td");
          return {
            name: tds[1].innerText,
            area: tds[2].innerText,
            campus: tds[3].innerText,
            length: tds[5].innerText,
          };
        } else {
          return null;
        }
      })
      .filter(row => row);
  });
  console.log(data, 'let"s see');

  await writeFile(
    "data/coursedetails.json",
    JSON.stringify(data),
    "utf-8",
    err => {
      if (err) throw err;
      console.log("saved file...");
    }
  );
  await browser.close();
})();
