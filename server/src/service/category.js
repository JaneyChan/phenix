const categoryModal = require('../models/category');
const articleModel = require('../models/article');

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
  
  /**
   * 删除分类
   */
  static async deleteCategory(formData) {

    let result = await articleModel.getArticlesByCategoryId(formData.id);
    if(result.length > 0) {
      return '该分类下有文章，不能删除';
    }

    result =  await categoryModal.deleteCategory(formData.id);
    return result;
  }
}

module.exports = CategoryService;
