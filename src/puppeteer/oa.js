const puppeteer = require('puppeteer');
const dayjs = require('dayjs');
const Mailer = require('../mail/mailer');
const users = [
    {
        name: '18163680885',
        pass: 'Zwm198875'
    }
];

const baoCan = async (account, password, type) => {
    console.time('forShowInfo');
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    const dateStr = dayjs().format('YYYY-MM-DD HH:mm:ss dddd => ');
    let name = type === 'lunch' ? '中餐' : '晚餐';
    try {
        await page.goto('http://oa.caohua.com/html/#/login');

        // 登录
        await page.type('input[name="account"]', account);
        await page.type('input[name="password"]', password);
        await page.click('.denglu');
        await page.waitForNavigation({
            waitUntil: 'load'
        });

        await page.waitFor(2000);
        let selector;
        if (type === 'lunch') {
            selector = '#main-content > div.content.oa-content > div:nth-child(6) > div:nth-child(3) > div > div.el-card__body > div.gzcyd_btn > div:nth-child(1) > button'
        } else {
            selector = '#main-content > div.content.oa-content > div:nth-child(6) > div:nth-child(3) > div > div.el-card__body > div.gzcyd_btn > div:nth-child(2) > button'
        }
        await page.waitFor('.gzcyd_btn button');
        const btn = await page.$(selector)
        const state = await page.evaluate(el => el.classList.contains("el-button--default"), btn);
        if (!state) {
            await btn.click(selector);
            await page.waitForResponse('http://oa.caohua.com/mealOrder/book');
            await browser.close();
            console.log(`${dateStr}${account}${name}报餐成功！`)
        } else {
            await browser.close();
            await Mailer.sendMail('xiejunping@caohua.com', '定时任务发送邮件', `<b>${dateStr}${account}${name}已报餐！</b>`);
            console.log(`${dateStr}${account}${name}已报餐！`)
        }
    } catch (err) {
        await browser.close();
        await Mailer.sendMail('xiejunping@caohua.com', '定时任务发送邮件', `<b>${dateStr}${account}${name}报餐失败%</b>`);
        console.log(`${dateStr}${account}${name}报餐失败%`)
    }
    console.timeEnd('forShowInfo');
}

const forShowInfo = async () => {
    for(const x of users) {
        await baoCan(x.name, x.pass, 'lunch')
        await baoCan(x.name, x.pass, 'dinner')
    }
}

forShowInfo()
