const puppeteer = require('puppeteer');

const AC = 'xiejunping008@sina.com';
const PW = 'lss198875';

// 匿名函数自执行
(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.gzidc.com/Member/MemberIndex/login.html');

    // 登录
    await page.type('#l-name', AC);
    await page.type('#l-pwd', PW);
    await page.click('#login-submit');

    await page.waitForNavigation({
        waitUntil: 'load'
    });
    await page.click('#btn-sign');
    await page.waitFor(1000);
    // await page.waitForNavigation({
    //     waitUntil: 'load'
    // });
    // await page.click('#btn-sign')
    // await page.waitForNavigation({
    //     waitUntil: 'domcontentloaded'
    // }) 

    await page.click('body > div.footer.footer-fix > div > p > a:nth-child(1)');
    await page.waitForNavigation({
        waitUntil: 'load'
    })
    // await page.click('.ctn-egg-bottom li')
    await browser.close();
})();