/**
 * restful api 子路由
 */

const router = require('koa-router')()
const articleController = require('../controllers/article');

const routers = router
  .get('/article/list', articleController.getArticles)
  .post('/article/create', articleController.createArticle)
  .post('/article/update', articleController.updateArticle)
  
module.exports = routers
