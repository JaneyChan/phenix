const dbUtils = require('../utils/db');

class ArticleModal {
  /**
   * 查询文章列表
   * @param {Number} categoryId    分类ID
   * @return {Array} result        查找结果
   */
  static async getArticlesByCategoryId(categoryId) {
    let _sql = "SELECT * FROM ?? WHERE categoryId = ? and inTrash = ?"
    let result = await dbUtils.query(_sql, ['article', categoryId, 0])
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result
    } else {
      result = []
    }
    return result;
  }
  
  /**
   * 创建文章
   * @param {*} model 
   */
  static async createArticle( model ) {
    let insertResult = await dbUtils.insertData( 'article', model);
    let result = null;

    if ( insertResult && insertResult.insertId) {
      let res = await this.getArticleById('article', insertResult.insertId)
      if(res && res.length > 0) {
        result = res[0];
      }
    }
    return await this.getArticleById('article', insertResult.insertId);
  }

  /**
   * 修改文章
   * @param {Object} model     要修改的文章内容
   * @param {id} id            文章ID
   */
  static async updateArticle( model, id ) {
    return await dbUtils.updateData( 'article', model, id)
  }
  /**
   * 根据文章Id获取文章内容
   * @param {Number} id       文章ID
   */
  static async getArticleById( id ) {
    return await dbUtils.findDataById('article', id);
  }
  /**
   * 根据ID删除文章内容
   * @param {Number} id       文章ID
   */
  static async deleteArticleById( id ) {
    return await dbUtils.deleteDataById('article', id);
  }
}

module.exports = ArticleModal;
