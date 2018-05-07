const dbUtils = require('../utils/db');

class ArticleModal {
  /**
   * 查询文章列表
   * @return {object|null}         查找结果
   */
  static async getArticles() {
    let _sql = `SELECT * from article`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result
    } else {
      result = null
    }
    return result
  }
  
  /**
   * 创建文章
   * @param {*} model 
   */
  static async createArticle( model ) {
    let result = await dbUtils.insertData( 'article', model);
    return result
  }

  /**
   * 修改文章
   * @param {*} model 
   */
  static async createArticle( model ) {
    let result = await dbUtils.insertData( 'article', model);
    return result
  }
}

module.exports = ArticleModal;
