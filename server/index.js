const App = require('./src/app');

let koa = new App().koa;
koa.listen(7777, () => {
    console.log('Node is listening in 7777');
});