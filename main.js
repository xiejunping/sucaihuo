const Koa = require('koa');
const app = new Koa();

/**
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    // console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});
*/

/**
app.use(async ctx => {
    const url = ctx.url;
    const request = ctx.request;
    const req_query = request.query;
    const req_querystring = request.querystring;

    const ctx_query = ctx.query;
    const ctx_querystring = ctx.querystring;

    ctx.body = {
        url,
        req_query,
        req_querystring,

        ctx_query,
        ctx_querystring
    };
});
*/


app.listen(3000);