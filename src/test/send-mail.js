const Mailer = require('../mail/mailer');

(async () => {
    try {
        await Mailer.sendMail('xiejunping@caohua.com', '定时任务发送邮件', `<b>Hello Word!</b>`);
    } catch (err) {
        console.log(err)
    }
})()
