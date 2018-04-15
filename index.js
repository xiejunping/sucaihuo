/* Cobbler create 2018/4/2 */

const cheerio = require('cheerio');
const model = require('./http/api');

const users = require('./config/user');

const showColumn = async (user, pwd) => {
    const data = await model.userLogin({
        username: user,
        pwd: pwd,
    });

    const data1 = await model.getSignCode(data.cookie);
    const $ = cheerio.load(data1);
    const key = $('#table_sign').data('key');

    const data2 = await model.signDay(key, data.cookie);

    return `${key}: ${data2}`;
};

const forShowInfo = async () => {
    console.time('forShowInfo');

    const promises = users.map((x) => showColumn(x.name, x.pass));
    for (const promise of promises) {
        const info = await promise;

        console.log(`INFO: ${info}`);
    }

    console.timeEnd('forShowInfo');
};

forShowInfo();
