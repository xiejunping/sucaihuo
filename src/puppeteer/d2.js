const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://daily.fairyever.com/');

    await page.click('#app > div.theme-container > aside > ul > li:nth-child(2) > section > ul > li:nth-child(1) > a');
    await page.waitForNavigation({
        waitUntil: 'load'
    });

    await page.waitForSelector('.component__daily-item')
    const h3 = await page.$$eval('h3', el => el.map(ret => ret.innerText.replace(/#\n/i, '')))
    const obj = await page.$$eval('.component__daily-item', el => el.map(ret => {
        const blockQuote = ret.querySelector('blockquote')
        const desc = blockQuote ? blockQuote.innerText : '';
        const url = ret.querySelector('a').getAttribute("href");
        const text = ret.querySelector('a').innerText;
        return {
            url,
            desc,
            text
        }
    }))
    
    // const b = await page.$$('.component__daily-item')
    
    for (let i = 0; i < obj.length; i++) {
        obj[i] = Object.assign(obj[i], {title: h3[i]})
    }

    console.log(obj)
    // console.log(b)
    // console.log(h3)
    await browser.close();
})();