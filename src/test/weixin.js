/* Cobbler Create 2021/1/25 */

const dayjs = require('dayjs');
const axios = require('axios');
const model = require('../../http/radio');

const imationWeixin = async () => {
    console.time('imation-weixin');
    // const data = await axios.getWeixinSign();
    const data = await model.getWeixinSign();
    // console.log(data);
    console.log(dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A'))

    console.timeEnd('imation-weixin')
}

// 模拟微信访问
imationWeixin();
