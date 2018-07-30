const articleModel = require('../models/article');

class ArticleService {
  
  static async getAllArticles() {
    let result = await articleModel.getAllArticles();
    return result;
  }

  /**
   * 创建文章
   * @param {Object} formData
   */
  static async createArticle(formData) {
    let result = await articleModel.createArticle(formData);
    return result;
  }

  /**
   * 更新文章
   * @param {Object} formData
   */
  static async updateArticle(formData) {
    let result = await articleModel.updateArticle(formData, formData.id);
    return result;
  }
   /**
   * 根据文章分类获取文章列表
   * @param {Number} categoryId 
   */
  static async getArticlesByCategoryId(categoryId) {
    let result = await articleModel.getArticlesByCategoryId(categoryId);
    return result;
  }
  /**
   * 根据id获取文章内容
   * @param {Number} id 
   */
  static async getArticleById(id) {
    let result = await articleModel.getArticleById(id);
    return result;
  }
}

module.exports = ArticleService;
