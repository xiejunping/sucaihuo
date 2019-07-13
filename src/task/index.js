const schedule = require('node-schedule');

const scheduleCronstyle = () => {
    schedule.scheduleJob('30 * * * * *', () => {
        console.log('scheduleCronstyle:' + new Date())
    })
};

scheduleCronstyle();
