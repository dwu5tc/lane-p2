const koa = require('koa');
const app = new koa();
const custom = require('./custom');

app.use(custom({
	verbose: true
}));

app.use(async ctx => {
	ctx.body = 'Jello World' + ctx.weather + ctx.temp + ctx.lat + ctx.lon;
});

app.listen(3000);
console.log('LOP 3000');