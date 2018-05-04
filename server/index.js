const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routers = require('./routes/index')

const app = new Koa();


// 配置ctx.body解析中间件
app.use(bodyParser());

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(7777, () => {
    console.log('Node is listening in 7777');
});

module.exports = app;
