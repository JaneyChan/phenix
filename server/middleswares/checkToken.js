const jwtKoa = require('koa-jwt')
const secret = require('../config').jwt.secret;

module.exports = jwtKoa({secret}).unless({path: [/^\/api\/user\/signIn/]})
