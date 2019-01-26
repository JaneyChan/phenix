const articleModel = require('../models/article');
const categoryModal = require('../models/category');
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
      let list = await articleModel.getArticlesByPage(formData.offset, formData.limit);
      list && list.map((item) => {
        let articleContent = item.content,
          arr = articleContent && articleContent.split('<!--more-->') || [];
        if(articleContent && articleContent.indexOf('<!--more-->') !== -1 && arr.length >= 2){
          item.abstract = articleContent.split('<!--more-->')[0];
        } else {
          item.abstract = '';
        }
        delete item.content;
        return item;
      })
      data.list = list;
      data.offset = formData.offset;
      data.limit = formData.limit;
      data.total = allArticles.length
    }

    result = handle.response(true, '', data, 200);
    ctx.body = result;
  }

  /**
   * 按分类获取文章类别
   * @param {*} ctx 
   */
  static async getArticlesSortByCategory(ctx) {
    let categories = await categoryModal.getCategoryList();
    for(let i = 0; i < categories.length; i++) {
      let articles = await articleModel.getPublishArticlesByCategoryId(categories[i].id, 1);
      if(articles.length > 0) {
        categories[i].articles = articles;
      }
    }
    categories = categories.filter((item) => {
      return item.articles;
    })
    let result = handle.response(true, '', categories, 200);
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
   * 获取回收站中的文章列表
   * @param {*} ctx 
   */
  static async getRecycleArticles(ctx) {
    let result = handle.response(false, '获取列表失败', null, 201);
    let articleResult = await articleModel.getRecycleArticles();
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
        ...formData,
        updateTime: new Date().getTime()
      },
      formData.id
    );

    if(articleResult) {
      result = handle.response(true, '', null, 200);
    }
    ctx.body = result;
  }
  static async getArticleById(ctx) {
    let result = handle.response(false, '获取文章失败', null, 201);
    let articleId = ctx.params.id;
    let articleResult = await articleModel.getArticleById(articleId);
    if (articleResult) {
      result = handle.response(true, '', articleResult, 200);
    }
    ctx.body = result;
  }
  static async getArticleByRouteName(ctx) {
    let result = handle.response(false, '获取文章失败', null, 201);
    let routeName = ctx.params.routeName;
    let articleResult = await articleModel.getArticleByRouteName(routeName);
    console.log('articleResult ' + JSON.stringify(articleResult))
    if (articleResult) {
      result = handle.response(true, '路由', articleResult, 200);
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

    let articleResult = await articleModel.updateArticle({ status: 0, publish: 0 }, formData.id);
    if (articleResult) {
      result = handle.response(true, '', {}, 200);
    }
    ctx.body = result;
  }
}

module.exports = ArticleController;
