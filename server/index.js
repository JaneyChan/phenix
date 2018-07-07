const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routers = require('./routes/index')
const checkToken = require('./middleswares/checkToken')

const app = new Koa();

// 配置ctx.body解析中间件
app.use(bodyParser());
// 使用token验证
app.use(checkToken);
// 初始化路由中间件
app.use(routers.routes())
app.use(routers.allowedMethods());

app.listen(7777, () => {
    console.log('Node is listening in 7777');
});

module.exports = app;
