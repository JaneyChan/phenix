/**
 * restful api 子路由
 */

const router = require('koa-router')()
const articleController = require('../controllers/article');

const routers = router
  .post('/articles', articleController.getAllArticles)
  .post('/article', articleController.getArticleById)

module.exports = routers
