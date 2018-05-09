const dbUtils = require('../utils/db');

class ArticleModal {
  /**
   * 查询文章列表
   * @return {object|null}         查找结果
   */
  static async getArticles() {
    let _sql = `SELECT * from article order by id desc`
    let result = await dbUtils.selectOrderByIdDesc('article', '*')
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
    let result = await dbUtils.updateData( 'article', model, id);
    return result
  }
}

module.exports = ArticleModal;
