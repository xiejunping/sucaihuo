/* Cobbler create 2018/4/2 */

const cheerio = require('cheerio');
const model = require('./http/api');

const users = require('./config/user');
const Queue = require('promise-queue-plus')
const queue = new Queue(1, {
    'retry': 3,
    'retryIsJump': false,
    'timeout': 2000
})

const showColumn = async (user, pwd) => {
    const data = await model.userLogin({
        username: user,
        pwd: pwd,
    });

    const data1 = await model.getSignCode(data.cookie);
    const $ = cheerio.load(data1);
    const key = $('#table_sign').data('key');

    const data2 = await model.signDay(key, data.cookie);

    // console.log(`签到: ${data2}积分`);
    // return `${key}: ${data2}`;
};

const forShowInfo = async () => {
    console.time('forShowInfo');

    for(const x of users) {
        if (queue.isStart()) {
            queue.push(showColumn, [x.name, x.pass], {
                'workFinally': function() {
                    console.log(`${x.name} 签到完成！`)
                },
            })
        } else {
            // 队列未启动，启动
            queue.go(showColumn, [x.name, x.pass], {
                'workFinally': function() {
                    console.log(`${x.name} 签到完成！`)
                },
            }).then(() => {
                console.log(`队列已启动`)
            })
        }
    }

    // const promises = users.map((x) => showColumn(x.name, x.pass));
    // for (const promise of promises) {
    //     const info = await promise;
    //
    //     console.log(`INFO: ${info}`);
    // }

    console.timeEnd('forShowInfo');
};

forShowInfo();
