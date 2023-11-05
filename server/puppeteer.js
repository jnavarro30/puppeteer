import puppeteer from "puppeteer";
// import "dotenv/config";
// import fs from "fs";

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.albertsons.com/");
  await page.waitForTimeout(3000);

  // enter site and use searchbar

  await page.waitForSelector("#skip-main-content");
  await page.locator("#skip-main-content").fill("strawberries");
  await page.keyboard.press("Enter");
  // await page.locator("[data-cross-sell-position='1']").click();
  await page.waitForTimeout(3000);

  // get itmes

  const allProducts =
    "#search-grid_0 > div > div.row.gutters-items-v2.grid-wrapper.product-grid-v2.product-card-grid";
  const html = await page.$eval(allProducts, element => element.innerHTML);

  // fs.writeFile("html.html", html, err => {
  //   if (err) throw Error(err);
  //   console.log("saved");
  // });

  // filter products

  // add to html
  // document.getElementsByClassName("container")[0].innerHTML = html;
  console.log(html, "yahoooooo");

  // let price = await page.locator("[data-qa='prd-itm-pprc-qty']").innerText;
  // const innerText = await page.evaluate(locator => {
  //   const element = document.querySelector(locator);
  //   return element ? element.innerText : null;
  // }, locator);

  await page.waitForTimeout(3000);

  // console.log(innerText, "da price");

  // await page.screenshot({ path: "example.png", fullPage: true });

  await browser.close();

  return html;
};

export default run;
