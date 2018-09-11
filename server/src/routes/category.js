/**
 * restful api 子路由
 */

const router = require('koa-router')()
const categoryController = require('../controllers/category');
const checkAuth = require('../middleswares/checkAuth');

const routers = router
  .get('/category/list', checkAuth, categoryController.getCategoryList)
  .post('/category/create', checkAuth, categoryController.createCategory)
  .post('/category/update', checkAuth, categoryController.updateCategory)
  .post('/category/delete', checkAuth, categoryController.deleteCategory)
  
module.exports = routers
