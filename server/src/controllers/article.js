const articleModel = require('../models/article');
const handle = require('../utils/handle');
const utils = require('../utils/common');

class ArticleController {
  /**
   * 获取文章列表
   * @param {*} ctx 
   */
  static async getArticles(ctx) {
    let result = {
      success: false,
      message: '',
      data: [],
      code: '0'
    };
    let articleResult = await articleModel.getArticles();

    if (articleResult) {
      result.success = true;
      result.message = '';
      result.data = articleResult;
    }
    ctx.body = result;
  }

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
    let articleResult = await articleModel.getArticlesByCategoryId(formData.categoryId);

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
    let articleResult = await articleModel.createArticle({
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
    let result = {
      success: false,
      code: handle.message.ERROR_DATA_CODE,
      message: handle.code.FAIL_ARTICLE_UPDATE,
      data: []
    };
    let articleResult = await articleModel.updateArticle(
      {
        title: formData.title,
        publish: parseInt(formData.publish) || 0,
        content: formData.content,
        updateTime: new Date().getTime()
      },
      formData.id
    );

    if (articleResult) {
      result.success = true;
      result.data = articleResult;
    }
    ctx.body = result;
  }
  static async getArticleById(ctx) {
    let formData = ctx.request.body;
    let result = {
      success: false,
      code: handle.message.ERROR_DATA_CODE,
      message: handle.code.FAIL_ARTICLE_UPDATE,
      data: []
    };
    let articleResult = await articleModel.getArticleById(formData.id);
    if (articleResult) {
      result.success = true;
      result.data = articleResult;
    }
    ctx.body = result;
  }
}

module.exports = ArticleController;
