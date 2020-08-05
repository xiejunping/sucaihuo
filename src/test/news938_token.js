/* Cobbler Create 2020/8/5 */

const fs = require('fs');
const path = require('path');
const model = require('../../http/radio');
// const { cookie } = require('../../data/radio_token');
// const defaultCookie = 'az_sess_=5bca269702ceebf4a76594f09fd908b62c96bbdc';
/**
 * 日期格式化
 * @param date
 * @param fmt
 * @returns {*}
 */
const formatDate = (date, fmt) => {
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

const refreshToken = async () => {
    console.time('task-token');
    // let cookies = defaultCookie;
    // console.log('cookie:', cookie)
    // if (cookie !== 'undefined') cookies = cookie; // 动态库复盖
    const data = await model.getSignInfo('az_sess_=3f8ea4318c167e6e40c7f87a15a8f6e9cde5f0d0');
    console.log(data.cookie)
    if (data.cookie) {
        const str = `module.exports = { cookie: '${data.cookie}' }`
        // 写入文件
        fs.writeFile(path.resolve(__dirname, '../../data/radio_token.js'), str, error => {
            if (error) return console.log("写入文件失败,原因是" + error.message);
            console.log('写入成功', formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'));
        });
    } else console.log('获取token失败')

    console.timeEnd('task-token');
};

// 执行签到
refreshToken();