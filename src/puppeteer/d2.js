const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;

const {url, database} = require('../mongod/config');
const client = new MongoClient(url);

const insertData = async data => {
    return new Promise((resolve, reject) => {
        client.connect((err, client) => {
            if (err) reject('数据库连接失败');
            console.log('数据库已连接');

            const db = client.db(database);

            // insert
            db.collection('news').insertMany(data, (err, r) => {
                if (err) reject('插入数据库失败');

                resolve(r);
                client.close();
            });
        });
    })
}

(async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    try {
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

        await insertData(obj);
        await browser.close();
        console.log('抓取成功')
    } catch (err) {
        console.log('抓取错误')
    }
})();
