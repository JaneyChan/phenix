const categoryService = require('../service/category');
const handle = require('../utils/handle');

class CategoryController {
  /**
   * 获取文章列表
   */
  static async getCategoryList(ctx) {
    let result = handle.response(false, '获取列表失败', null, 201);

    let categoryResult = await categoryService.getCategoryList();
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
    let categoryResult = await categoryService.createCategory({
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
    let categoryResult = await categoryService.updateCategory({
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
  static async deleteCategory(ctx) {
    let result = handle.response(false, '删除失败', null, 201);
    
    let categoryResult = await categoryService.deleteCategory({ id: formData.id });

    if (categoryResult) {
      result = handle.response(true, '', categoryResult, 200);
    }
    ctx.body = result;
  }
}

module.exports = CategoryController;
