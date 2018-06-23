const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

/**
 * 在app.use(router)之前调用
 */
app.use(async (ctx, next) => {
    //先去执行路由
    await next();

    //如果有返回数据，将返回数据添加到data中
    if (ctx.msg && ctx.body) {
        ctx.body = {
            code: 400,
            message: ctx.msg,
            data: ctx.body
        }
    } else {
        ctx.body = {
            code: 0,
            message: ctx.msg,
            data: ctx.body
        }
    }
})

router.get('/test/next', async (ctx, next) => {
    console.log('the is 1st')
    await next()
}, async (ctx, next) => {
    console.log('the is 2ed')
    ctx.body = false
    ctx.msg = '请求错误了'
    await next()
}, async (ctx, next) => {
    console.log('3tree')
    return
})

app.use(router.routes())

app.listen(3000)