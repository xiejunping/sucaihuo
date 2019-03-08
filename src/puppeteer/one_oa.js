const puppeteer = require('puppeteer');

const baoCan = async (account, password, type) => {
    console.time('timeInfo')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://oa.caohua.com/html/#/login');

    // 登录
    await page.type('input[name="account"]', account);
    await page.type('input[name="password"]', password);
    await page.click('.denglu');
    await page.waitForNavigation({
        waitUntil: 'load'
    });

    await page.waitFor(2000);
    let selector, name;
    if (type === 'lunch') {
        name = '中餐';
        selector = '#main-content > div.content.oa-content > div:nth-child(6) > div:nth-child(3) > div > div.el-card__body > div.gzcyd_btn > div:nth-child(1) > button'
    } else {
        name = '晚餐';
        selector = '#main-content > div.content.oa-content > div:nth-child(6) > div:nth-child(3) > div > div.el-card__body > div.gzcyd_btn > div:nth-child(2) > button'
    }
    try {
        await page.waitFor('.gzcyd_btn button');
        const btn = await page.$(selector)
        const state = await page.evaluate(el => el.classList.contains("el-button--default"), btn);
        if (!state) {
            await btn.click(selector);
            await page.waitForResponse('http://oa.caohua.com/mealOrder/book');
            await browser.close();
            console.log(`${name}报餐成功！`)
        } else {
            await browser.close();
            console.log(`${name}已报餐！`)
        }
    } catch (err) {
        await browser.close();
        console.log(err)
        console.log(`${name}报餐失败%`)
    }
    console.timeEnd('timeInfo')
}

baoCan('18163680885', '88888888', 'dinner')