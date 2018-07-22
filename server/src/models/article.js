const dbUtils = require('../utils/db');

class ArticleModal {
  /**
   * 查询文章列表
   * @param {Number} categoryId    分类ID
   * @return {Array} result        查找结果
   */
  static async getArticlesByCategoryId(categoryId) {
    let _sql = "SELECT * FROM ?? WHERE categoryId = ? and inTrash = ? "
    return dbUtils.query(_sql, ['article', categoryId, 0])
  }
  
  /**
   * 创建文章
   * @param {*} model 
   */
  static async createArticle( model ) {
    return await dbUtils.insertData( 'article', model)
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
