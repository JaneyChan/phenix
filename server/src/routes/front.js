/**
 * restful api 子路由
 */

const router = require('koa-router')()
const articleController = require('../controllers/article');

const routers = router
  .post('/article', articleController.getArticleById)
//   .get('/article/list', articleController.getArticles)

module.exports = routers
