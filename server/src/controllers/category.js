const categoryService = require('../service/category');
const handle = require('../utils/handle');

class CategoryController {
  /**
   * 获取文章列表
   */
  static async getCategoryList(ctx) {
    let result = {
      success: false,
      code: handle.code.ERROR_CODE,
      message: handle.message.FAIL_CATEGORY,
      data: []
    };
    let categoryResult = await categoryService.getCategoryList();

    if (categoryResult) {
      result.success = true;
      result.code = '';
      result.message = '';
      result.data = categoryResult;
    }
    ctx.body = result;
  }

  /**
   *
   * @param {*} ctx
   */
  static async createCategory(ctx) {
    let result = {
      success: false,
      message: handle.message.FAIL_CATEGORY,
      data: null,
      code: handle.code.FAIL_CATEGORY_UPDATE
    };
    let formData = ctx.request.body;
    let currentTime = new Date().getTime();
    let categoryResult = await categoryService.createCategory({
      name: formData.name,
      createTime: currentTime,
      updateTime: currentTime
    });

    if (categoryResult) {
      result.success = true;
      result.message = '';
      result.code = '';
      result.data = categoryResult;
    }
    ctx.body = result;
  }

  /**
   *
   * @param {*} ctx
   */
  static async updateCategory(ctx) {
    let formData = ctx.request.body;
    let result = {
      success: false,
      message: handle.message.FAIL_CATEGORY,
      data: null,
      code: handle.code.FAIL_CATEGORY_UPDATE
    };
    let categoryResult = await categoryService.updateCategory(
      {
        name: formData.name,
        updateTime: new Date().getTime()
      },
      formData.id
    );

    if (categoryResult) {
      result.success = true;
      result.message = '';
      result.code = '';
      result.data = categoryResult;
    }
    ctx.body = result;
  }
}

module.exports = CategoryController;
