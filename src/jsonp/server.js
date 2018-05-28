const Koa = require('koa')
const Router = require('koa-router')
const axios = require('axios')
const cors = require('koa2-cors')

const app = new Koa()
const router = new Router()

router.prefix('/api')

router.get('/', function (ctx, next) {
    ctx.body = 'Hello World';
})

router.get('/getRecommend', (ctx, next) => {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    return axios(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: ctx.query
    }).then((response) => {
        ctx.body = response.data
        next()
    }).catch((e) => {
        console.log(e)
    })
})

router.get('/getDiscList', (ctx, next) => {
    console.log(ctx.query)
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg';
    return axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: ctx.query
    }).then(function(response) {
        ctx.body = response.data
        next()
    }).catch(function(e) {
        console.log(e)
    })
})

app.use(cors()).use(router.routes())

app.listen(3000)
