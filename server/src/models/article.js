const dbUtils = require('../utils/db');

class ArticleModal {

  /**
   * 获取所有公开的文章列表
   */
  static async getAllArticles() {
    let _sql =  "SELECT * FROM ?? WHERE status = ? "
    let result = await dbUtils.query(_sql, ['article', 1])
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result
    } else {
      result = []
    }
    return result;
  }

  /**
   * 根据分页获取所有公开的文章列表
   */
  static async getArticlesByPage(offset = 0, limit = 10) {
    let _sql = "SELECT * FROM ?? WHERE status = ? and publish = ? ORDER BY createTime DESC LIMIT ?, ?"
    let result = await dbUtils.query(_sql, ['article', 1, 1, offset, limit])
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result
    } else {
      result = []
    }
    return result;
  }

  /**
   * 查询文章列表
   * @param {Number} categoryId    分类ID
   * @return {Array} result        查找结果
   */
  static async getArticlesByCategoryId(categoryId) {
    let _sql = "SELECT * FROM ?? WHERE categoryId = ? and status = ?"
    let result = await dbUtils.query(_sql, ['article', categoryId, 1])
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result
    } else {
      result = []
    }
    return result;
  }
  /**
   * 查询公开文章列表
   * @param {Number} categoryId    分类ID
   * @param {Number} publish       是否公开，1:公开 0:不公开
   * @return {Array} result        查找结果
   */
  static async getPublishArticlesByCategoryId(categoryId, publish = 1) {
    let _sql = "SELECT * FROM ?? WHERE categoryId = ? and status = ? and publish = ?"
    let result = await dbUtils.query(_sql, ['article', categoryId, 1, publish])
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
      result = await this.getArticleById(insertResult.insertId)
    }
    return result;
  }

  /**
   * 修改文章
   * @param {Object} model     要修改的文章内容
   */
  static async updateArticle( model, id ) {
    return await dbUtils.updateData( 'article', model, id)
  }
  /**
   * 根据文章Id获取文章内容
   * @param {Number} id       文章ID
   */
  static async getArticleById( id ) {
    let result = await dbUtils.findDataById('article', id);
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = {}
    }
    return result;
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
