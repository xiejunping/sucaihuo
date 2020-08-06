/* Cobbler Create 2020/8/5 */

const fs = require('fs');
const path = require('path');
const model = require('../../http/radio');
const { formatDate } = require('../../common/utils')
// const { cookie } = require('../../data/radio_token'); // 动态库
const cookie = 'az_sess_=7bc9d07b9d396cde9bd72df960ef9ae8e44bc4b5';

const refreshToken = async () => {
    console.time('task-token');
    const data = await model.getSignCode(cookie);
    if (data.cookie) {
        const str = `module.exports = { cookie: '${data.cookie}' }`
        // 写入文件
        fs.writeFile(path.resolve(__dirname, '../../data/radio_token.js'), str, error => {
            if (error) return console.log("写入文件失败,原因是" + error.message);
            console.log('写入成功', formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss.S'));
        });
    } else console.log('获取token失败')

    console.timeEnd('task-token');
};

// 执行签到
refreshToken();
