const dbUtils = require('../utils/db');

class CategoryModal {
  /**
   * 查询文章列表
   * @return {Array}         查找结果
   */
  static async getCategoryList() {
    let result = await dbUtils.select('category', '*')
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
  static async createCategory( model ) {
    let insertResult = await dbUtils.insertData( 'category', model);
    let result = null;

    if ( insertResult && insertResult.insertId) {
      let res = await dbUtils.findDataById('category', insertResult.insertId)
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
  static async updateCategory( model, id ) {
    return await dbUtils.updateData( 'category', model, id);
  }
  static async deleteCategory (id) {
    return await dbUtils.deleteDataById('category', id);
  }
}

module.exports = CategoryModal;
