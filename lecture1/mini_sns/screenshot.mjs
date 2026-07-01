import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });

await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 15000 });
await page.evaluate(() => { sessionStorage.setItem('reborn_guest', 'true'); });
await page.goto('http://localhost:5174/#/', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 2500));

await page.screenshot({
  path: 'C:/Users/rhtpd/OneDrive/바탕 화면/고세연_바이브/lecture1/my-portfolio/public/reborn-thumb.png',
  clip: { x: 0, y: 0, width: 390, height: 600 },
});

await browser.close();
console.log('완료');
