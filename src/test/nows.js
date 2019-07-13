const fetch = require('node-fetch');
const cheerio = require('cheerio');
const schedule = require('node-schedule');
const mongoose = require('../mongod/helper');

const init = async () => {
    const a = await fetch('http://www.nows.fun')

    const b = await fetch('http://www.nows.fun')

    // console.log(JSON.parse(a))

    // console.log(JSON.parse(b))
    console.log('a:', a.body._outBuffer.toString())
    console.log('b:', b.body._outBuffer.toString())
}

const paChong = async () => {
    setInterval(async () => {
        await httpRep()
    }, 500)
}

const httpRep = async () => {
    const response = await fetch('http://www.nows.fun')
    const htmlString = response.body._outBuffer.toString()

    const $ = cheerio.load(htmlString)
    const title = $('#sentence').text()
    try {
        if (!title) return
        const rs = await mongoose.insert('nows', [{title}]);
        console.log(`"${title}" 已入库`);
    } catch (err) {
        // console.log(`"${title}" 重复`)
    }
}

// 验证同时会不会一样
// init()
  
// 跑库
paChong()