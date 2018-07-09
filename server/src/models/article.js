const dbUtils = require('../utils/db');

class ArticleModal {
  /**
   * 查询文章列表
   * @return {Array}         查找结果
   */
  static async getArticles() {
    let result = await dbUtils.select('article', '*')
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result
    } else {
      result = []
    }
    return result
  }

  /**
   * 查询文章列表
   * @return {Array}         查找结果
   */
  static async getArticlesByCategoryId(categoryId) {
    let _sql = "SELECT * FROM ?? WHERE categoryId = ? "
    let result = await dbUtils.query(_sql, ['article', categoryId])
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result
    } else {
      result = []
    }
    return result
  }
  
  /**
   * 创建文章
   * @param {*} model 
   */
  static async createArticle( model ) {
    let insertResult = await dbUtils.insertData( 'article', model);
    let result = null;

    if ( insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById('article', insertResult.insertId)
      if(res && res.length > 0) {
        result = res[0];
      }
    }
    return result
  }

  /**
   * 修改文章
   * @param {*} model 
   */
  static async updateArticle( model, id ) {
    let updateResult = await dbUtils.updateData( 'article', model, id);
    let result = null;
    let res = await dbUtils.findDataById('article', id);
    if(res && res.length > 0) {
      result = res[0];
    }
    return result
  }
}

module.exports = ArticleModal;
