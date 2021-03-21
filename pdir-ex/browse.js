const puppeteer = require('puppeteer');
const url = 'https://www.purdue.edu/directory/';
async function run() {
  const time1 = Date.now();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.type('input[name=SearchString]', 'Tushar Sonvani');
  await page.keyboard.press('Enter');
  await page.waitForSelector('#results');
  const textContent = await page.evaluate(() => {
    return document.querySelector('#results').innerText;
  });
  console.log(textContent);
  const data = textContent.split('\n');
  if (data.length == 1) {
    console.log('Not A Student');
  }
  browser.close();
  const time2 = Date.now();
  console.log(`Time Elapsed: ${time2 - time1}`);
}
run();
