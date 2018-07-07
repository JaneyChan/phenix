const jwtKoa = require('koa-jwt')
const secret = require('../utils/config').jwt.secret;

module.exports = jwtKoa({secret}).unless({path: [/^\/api\/user\/signIn/]})
