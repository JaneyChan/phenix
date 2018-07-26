/**
 * restful api 子路由
 */

const router = require('koa-router')()
const articleController = require('../controllers/article');

const routers = router
  .post('/article/create', articleController.createArticle)
  .post('/article/update', articleController.updateArticle)
  .post('/articles/category', articleController.getArticlesByCategoryId)
  .post('/article/status', articleController.changeArticleStatus)


module.exports = routers
