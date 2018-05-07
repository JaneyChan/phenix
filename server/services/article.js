const articleModel = require('../models/article');

const article = {
    /**
   * 文章列表
   */
  async getArticles() {
    let resultData = await articleModel.getArticles()
    return resultData
  },

  /**
   * 创建文章
   * @param {*} article 
   */
  async createArticle( article ) {
    let resultData = await articleModel.createArticle(article)
    return resultData
  },
  /**
   * 修改文章
   * @param {*} article 
   */
  async updateArticle( article ) {
    let resultData = await articleModel.updateArticle(article)
    return resultData
  }
}

module.exports = article;
