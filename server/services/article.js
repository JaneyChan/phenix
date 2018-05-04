const articleModel = require('../models/article');

const article = {
    /**
   * 登录业务操作
   * @return {object}          登录业务操作结果
   */
  async getArticles() {
    let resultData = await articleModel.getArticles()
    return resultData
  }
}

module.exports = article;
