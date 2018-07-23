const articleService = require('../service/article');
const handle = require('../utils/handle');
const utils = require('../utils/common');

class ArticleController {
  /**
   * 根据文章分类获取文章列表
   * @param {*} ctx 
   */
  static async getArticlesByCategoryId(ctx) {
    let result = handle.response(false, '获取列表失败', null, 201);
    let formData = ctx.request.body;
    let articleResult = await articleService.getArticlesByCategoryId(formData.categoryId);
    if (articleResult) {
      result = handle.response(true, '', articleResult, 200);
    }
    ctx.body = result;
  }

  /**
   * 创建文章
   * @param {*} ctx
   */
  static async createArticle(ctx) {
    let result = handle.response(false, '创建失败', null, 201);

    let formData = ctx.request.body;
    let currentTime = new Date().getTime();
    let articleResult = await articleService.createArticle({
      title: utils.parseTime(currentTime, 'yyyy-MM-dd'),
      createTime: currentTime,
      updateTime: currentTime,
      categoryId: formData.categoryId
    });

    if (articleResult) {
      result = handle.response(true, '', articleResult, 200);
    }
    ctx.body = result;
  }

  /**
   * 更新文章
   * @param {*} ctx
   */
  static async updateArticle(ctx) {
    let result = handle.response(false, '更新失败', null, 201);

    let formData = ctx.request.body;
    let articleResult = await articleService.updateArticle({
        id: formData.id,
        title: formData.title,
        publish: parseInt(formData.publish) || 0,
        content: formData.content,
        updateTime: new Date().getTime()
      }
    );

    if(articleResult) {
      result = handle.response(true, '', articleResult, 200);
    }
    ctx.body = result;
  }
  static async getArticleById(ctx) {
    let result = handle.response(false, '更新失败', null, 201);

    let formData = ctx.request.body;
    let articleResult = await articleService.getArticleById(formData.id);
    if (articleResult) {
      result = handle.response(true, '', articleResult, 200);
    }
    ctx.body = result;
  }
  /**
   * 根据ID删除文章
   * @param {*} ctx 
   */
  static async pushArticleInTrash(ctx) {
    let result = handle.response(false, '更新失败', null, 201);

    let formData = ctx.request.body;
    let articleResult = await articleService.updateArticle({ formData });
    if (articleResult) {
      result = handle.response(true, '', articleResult, 200);
    }
    ctx.body = result;
  }
}

module.exports = ArticleController;
