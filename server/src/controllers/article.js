const articleService = require('../service/article');
const handle = require('../utils/handle');
const utils = require('../utils/common');

class ArticleController {
  /**
   * 根据文章分类获取文章列表
   * @param {*} ctx 
   */
  static async getArticlesByCategoryId(ctx) {
    let result = {
      success: false,
      code: handle.message.ERROR_DATA_CODE,
      message: handle.code.FAIL_ARTICLE,
      data: []
    };
    let formData = ctx.request.body;
    let articleResult = await articleService.getArticlesByCategoryId(formData.categoryId);

    if (articleResult) {
      result.success = true;
      result.message = '';
      result.code = '';
      result.data = articleResult;
    }
    ctx.body = result;
  }

  /**
   * 创建文章
   * @param {*} ctx
   */
  static async createArticle(ctx) {
    let result = {
      success: false,
      code: handle.message.ERROR_DATA_CODE,
      message: handle.code.FAIL_ARTICLE,
      data: []
    };
    let formData = ctx.request.body;
    let currentTime = new Date().getTime();
    let articleResult = await articleService.createArticle({
      title: utils.parseTime(currentTime, 'yyyy-MM-dd'),
      createTime: currentTime,
      updateTime: currentTime,
      categoryId: formData.categoryId
    });

    if (articleResult) {
      result.success = true;
      result.message = '';
      result.code = '';
      result.data = articleResult;
    }
    ctx.body = result;
  }

  /**
   * 更新文章
   * @param {*} ctx
   */
  static async updateArticle(ctx) {
    let formData = ctx.request.body;
    let articleResult = await articleService.updateArticle({
        id: formData.id,
        title: formData.title,
        publish: parseInt(formData.publish) || 0,
        content: formData.content,
        updateTime: new Date().getTime()
      }
    );

    ctx.body = {data: formData, message: '更新成功', success: true, code: 200};
  }
  static async getArticleById(ctx) {
    let formData = ctx.request.body;
    let result = {
      success: false,
      code: handle.message.ERROR_DATA_CODE,
      message: handle.code.FAIL_ARTICLE_UPDATE,
      data: []
    };
    let articleResult = await articleService.getArticleById(formData.id);
    if (articleResult) {
      result.success = true;
      result.data = articleResult;
    }
    ctx.body = result;
  }
  /**
   * 根据ID删除文章
   * @param {*} ctx 
   */
  static async pushArticleInTrash(ctx) {
    let formData = ctx.request.body;
    let result = {
      success: false,
      code: handle.message.ERROR_DATA_CODE,
      message: '删除失败',
      data: {}
    };
    let articleResult = await articleService.updateArticle({ formData });
    if (articleResult) {
      result.success = true;
      result.message = '';
      result.data = articleResult;
    }
    ctx.body = result;
  }
}

module.exports = ArticleController;
