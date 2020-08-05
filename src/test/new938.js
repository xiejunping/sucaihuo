/* Cobbler Create 2020/8/4 */

const cheerio = require('cheerio');
const model = require('../../http/radio');
const { cookie } = require('../../data/radio_token');

const signTask = async () => {
    console.time('task');
    const data = await model.getSignCode(cookie);
    const $ = cheerio.load(data.html, {decodeEntities: false});

    const hasSign = $('#sign-txt').html();
    if ('点击签到' === hasSign) {
        const singKey = await model.signDay(cookie);
        console.log(singKey)
    }

    console.timeEnd('task');
};

// 执行签到
signTask();
