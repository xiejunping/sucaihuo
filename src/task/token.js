const schedule = require('node-schedule');
const dayjs = require('dayjs');
const news938 = require('../test/news938_token')

const scheduleCronstyle = () => {
	schedule.scheduleJob('0 */1 * * * *', () => {
	console.log('scheduleCronstyle:' + dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A'))
	news938()
	})
};

// scheduleCronstyle();
news938();
console.log('handle:' + dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A'));
