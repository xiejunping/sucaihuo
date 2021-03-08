const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
	const ip = ctx.request.headers['x-real-ip'] || ctx.request.headers['x-forwarded-for'] || ctx.request.socket.remoteAddress;
	console.log(ip)
  	ctx.body = 'Hello World';
});

app.listen(3000);