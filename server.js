const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

const _port = 3000 || process.env.PORT;
const url = 'https://www.purdue.edu/directory/';
let isValid = false;

app.get('/api/:id', (req, res, next) => {
  const email = req.params.id;
  run(url, email, res);
  setTimeout(() => {
    res.json({ isValid: isValid });
    next();
  }, 10000);
});

async function run(url, email) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.type('input[name=SearchString]', email);
  await page.keyboard.press('Enter');
  await page.waitForSelector('#results');
  const textContent = await page.evaluate(() => {
    return document.querySelector('#results').innerText;
  });
  const data = textContent.split('\n');
  isValid = data.length == 1 ? false : true;
  browser.close();
}

app.listen(_port);
