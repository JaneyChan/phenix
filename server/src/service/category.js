const categoryModal = require('../models/category');

class CategoryService {

  /**
   * 创建分类
   * @param {Object} formData
   */
  static async createCategory(formData) {
    let result = await categoryModal.createCategory(formData);
    return  result;
  }

  /**
   * 更新分类
   * @param {Object} formData
   */
  static async updateCategory(formData) {
    let result = await categoryModal.updateCategory(formData, formData.id);
    return result;
  }
   /**
   * 获取分类列表
   */
  static async getCategoryList() {
    let result = await categoryModal.getCategoryList();
    return result;
  }
}

module.exports = CategoryService;
