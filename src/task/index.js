const schedule = require('node-schedule');
const dayjs = require('dayjs');
const new938 = require('../test/new938');
const news938 = require('../test/news938_token');

const scheduleCronstyle = () => {
    schedule.scheduleJob('0 */30 * * * *', () => {
        console.log('scheduleCronstyle:' + dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A'))
        // news938()
    })
    schedule.scheduleJob('*/1 29-30 7 * * *', () => {
        console.log('scheduleCronstyle:' + dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A'))
        new938()
    })
};

scheduleCronstyle();
