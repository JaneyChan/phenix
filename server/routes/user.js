/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('../controllers/userInfo');

const routers = router
  .post('/user/signIn', userInfoController.signIn)
  
module.exports = routers
