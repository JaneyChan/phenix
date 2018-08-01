const articleModel = require('../models/article');
const handle = require('../utils/handle');
const utils = require('../utils/common');

class ArticleController {
  
  /**
   * 根据分页获取文章列表
   * @param {*} ctx 
   */
  static async getArticlesByPage(ctx) {
    let result = handle.response(false, '获取列表失败', null, 201);
    let formData = ctx.request.body;
    let data = {
      offset: 0,
      limit: 10,
      total: 0,
      list: []
    };
    let allArticles = await articleModel.getAllArticles();

    if(allArticles && allArticles.length > 0) {
      data.list = await articleModel.getArticlesByPage(formData.offset, formData.limit);
      data.offset = formData.offset;
      data.limit = formData.limit;
      data.total = allArticles.length
    }

    result = handle.response(true, '', data, 200);
    ctx.body = result;
  }

  /**
   * 根据文章分类获取文章列表
   * @param {*} ctx 
   */
  static async getArticlesByCategoryId(ctx) {
    let result = handle.response(false, '获取列表失败', null, 201);
    let formData = ctx.request.body;
    let articleResult = await articleModel.getArticlesByCategoryId(formData.categoryId);
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
    let articleResult = await articleModel.createArticle({
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
    let articleResult = await articleModel.updateArticle({
        title: formData.title,
        publish: parseInt(formData.publish) || 0,
        content: formData.content,
        updateTime: new Date().getTime()
      },
      formData.id
    );

    if(articleResult) {
      result = handle.response(true, '', articleResult, 200);
    }
    ctx.body = result;
  }
  static async getArticleById(ctx) {
    let result = handle.response(false, '更新失败', null, 201);
    let articleId = ctx.params.id;
    let articleResult = await articleModel.getArticleById(articleId);
    if (articleResult) {
      result = handle.response(true, '', articleResult, 200);
    }
    ctx.body = result;
  }
  /**
   * 根据ID删除文章
   * @param {*} ctx 
   */
  static async changeArticleStatus(ctx) {
    let result = handle.response(false, '删除失败', null, 201);

    let formData = ctx.request.body;

    let findArticle = await articleModel.getArticleById(formData.id);
    if(!findArticle) {
      return handle.response(false, '未找到该文章', null, 201);
    }

    let articleResult = await articleModel.updateArticle({ status: 0 }, formData.id);
    if (articleResult) {
      result = handle.response(true, '', {}, 200);
    }
    ctx.body = result;
  }
}

module.exports = ArticleController;
