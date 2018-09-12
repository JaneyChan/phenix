/**
 * restful api 子路由
 */

const router = require('koa-router')()
const articleController = require('../controllers/article');
const checkAuth = require('../middleswares/checkAuth');

const routers = router
  .post('/article/create', checkAuth, articleController.createArticle)
  .post('/article/update', checkAuth, articleController.updateArticle)
  .post('/articles/category', checkAuth, articleController.getArticlesByCategoryId)
  .post('/article/status', checkAuth, articleController.changeArticleStatus)
  .get('/article/recycle', checkAuth, articleController.getRecycleArticles)

module.exports = routers
