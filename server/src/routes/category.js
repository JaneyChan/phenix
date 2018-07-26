/**
 * restful api 子路由
 */

const router = require('koa-router')()
const categoryController = require('../controllers/category');

const routers = router
  .get('/category/list', categoryController.getCategoryList)
  .post('/category/create', categoryController.createCategory)
  .post('/category/update', categoryController.updateCategory)
  .post('/category/delete', categoryController.deleteCategory)
  
module.exports = routers
