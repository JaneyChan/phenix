const categoryModal = require('../models/category');
const articleModel = require('../models/article');
const handle = require('../utils/handle');

class CategoryController {
  /**
   * 获取文章列表
   */
  static async getCategoryList(ctx) {
    let result = handle.response(false, '获取列表失败', null, 201);

    let categoryResult = await categoryModal.getCategoryList();
    if (categoryResult) {
      result = handle.response(true, '', categoryResult, 200);
    }
    ctx.body = result;
  }

  /**
   *
   * @param {*} ctx
   */
  static async createCategory(ctx) {
    let result = handle.response(false, '创建失败', null, 201);

    let formData = ctx.request.body;
    let currentTime = new Date().getTime();
    let categoryResult = await categoryModal.createCategory({
      name: formData.name,
      createTime: currentTime,
      updateTime: currentTime
    });

    if (categoryResult) {
      result = handle.response(true, '', categoryResult, 200);
    }
    ctx.body = result;
  }

  /**
   *
   * @param {*} ctx
   */
  static async updateCategory(ctx) {
    let result = handle.response(false, '创建失败', null, 201);

    let formData = ctx.request.body;
    let categoryResult = await categoryModal.updateCategory({
        name: formData.name,
        updateTime: new Date().getTime()
      },
      formData.id
    );

    if (categoryResult) {
      result = handle.response(true, '', categoryResult, 200);
    }
    ctx.body = result;
  }

  /**
   * 删除分类
   * @param {*} ctx 
   */
  static async deleteCategory(ctx) {
    let result = handle.response(false, '删除失败', null, 201);
    
    let formData = ctx.request.body;
    let articles = await articleModel.getArticlesByCategoryId(formData.id);
    if(articles.length > 0) {
      result = handle.response(false, '该分类下有文章，不能删除', null, 201);
    } else {
      await categoryModal.deleteCategory(formData.id);
      result = handle.response(true, '删除成功', null, 200);
    }
    ctx.body = result;
  }
}

module.exports = CategoryController;
