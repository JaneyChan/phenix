const categoryModal = require('../models/category');

const category = {
    /**
   * 文章列表
   */
  async getCategoryList() {
    let resultData = await categoryModal.getCategoryList()
    return resultData
  },

  /**
   * 创建文章
   * @param {*} category 
   */
  async createCategory( category ) {
    let resultData = await categoryModal.createCategory(category)
    return resultData
  },
  /**
   * 修改文章
   * @param {*} category 
   */
  async updateCategory( category, id ) {
    let resultData = await categoryModal.updateCategory(category, id)
    return resultData
  }
}

module.exports = category;
