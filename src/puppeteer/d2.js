const puppeteer = require('puppeteer');
const mongoose = require('../mongod/helper');

(async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    try {
        console.time('daily');
        await page.goto('https://daily.fairyever.com/');

        await page.click('#app > div.theme-container > aside > ul > li:nth-child(2) > section > ul > li:nth-child(1) > a');
        await page.waitFor(1000);

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
        }));

        for (let i = 0; i < obj.length; i++) {
            obj[i] = Object.assign(obj[i], {title: h3[i]})
        }

        const rs = await mongoose.insert('news', obj);
        console.log(rs);
        console.log('抓取成功');
        await browser.close();
        console.timeEnd('daily');
    } catch (err) {
        console.log('抓取错误');
        await browser.close();
        console.timeEnd('daily');
        process.exit(0);
    }
})();
