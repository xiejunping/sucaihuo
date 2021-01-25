const schedule = require('node-schedule');
const dayjs = require('dayjs');
const new938 = require('../test/new938')

const scheduleCronstyle = () => {
	schedule.scheduleJob('0 */1 * * * *', () => {
	console.log('scheduleCronstyle:' + dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A'))
	new938()
	})
};

scheduleCronstyle();
