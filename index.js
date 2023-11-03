import puppeteer from "puppeteer";
import "dotenv/config";
import fs from "fs";

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://portal.independa.com/");

  const createHTML = async () => {
    const html = await page.content();

    fs.writeFile("save-example.html", html, (err) => {
      if (err) throw err;
      console.log("File saved");
    });
  };

  // await page.screenshot({ path: 'example.png', fullPage: true });
  // console.log(title, 'whwh', process.env.USERNAME);

  // await page.type('[placeholder="Enter Email"]', process.env.USERNAME);
  // await page.type('[placeholder="Enter Password"]', process.env.PASSWORD);
  await page.locator('[placeholder="Enter Email"]').fill(process.env.USERNAME);
  await page
    .locator('[placeholder="Enter Password"]')
    .fill(process.env.PASSWORD);
  await page.click("button");
  // await page.locator('button').click();

  await page.waitForTimeout(3000);
  
  // await page.waitForSelector(".px-4.py-2");
  // await page.click(".px-4.py-2");
  await page.locator(".px-4.py-2").click();
  // await page.type("input", "Richland")
  await page.locator("input").fill("Richland");
  await page.waitForTimeout(1000);

  const searchText = "Dashboard";

  const element = await page.evaluate((searchText) => {
    const elements = document.querySelectorAll('*'); // You can narrow this down to a specific selector to search only in certain elements.

    console.log(elements, 'hahah')
    return 'hello' // Return null if the element is not found.
  }, searchText);

  if (element) {
    console.log(element, 'what is it')
    // You can now work with the found element, such as clicking it or extracting information.
    await element.click();
    // To extract information from the element, you can use element.textContent, element.getAttribute(), etc.
  } else {
    console.log('Element with text not found.');
  }



  await page.screenshot({ path: "example.png", fullPage: true });
  await createHTML();

  await browser.close();
};

run();
