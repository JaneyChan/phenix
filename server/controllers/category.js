const categoryService = require('../services/category');
const userCode = require('../codes/user');
const utils = require('../utils/common');

class CategoryController {
	/**
	 * 获取文章列表
	 */
    static async getCategoryList(ctx) {
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        let categoryResult = await categoryService.getCategoryList()

        if (categoryResult) {
            result.success = true;
            result.data = categoryResult;
        } else {
            result.code = 'FAIL_USER_NO_EXIST';
            result.message = userCode.FAIL_USER_NO_EXIST;
        }
        ctx.body = result;
    }

    /**
     * 
     * @param {*} ctx 
     */
    static async createCategory(ctx) {
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        let formData = ctx.request.body
        let currentTime = new Date().getTime();
        let categoryResult = await categoryService.createCategory({
            name: formData.name,
            createTime: currentTime,
            updateTime: currentTime
        })

        if (categoryResult) {
            result.success = true;
            result.data = categoryResult;
        } else {
            result.code = 'FAIL_USER_NO_EXIST';
            result.message = userCode.FAIL_USER_NO_EXIST;
        }
        ctx.body = result;
    }

    /**
     * 
     * @param {*} ctx 
     */
    static async updateCategory(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        let categoryResult = await categoryService.updateCategory({
            title: formData.title,
            publish: parseInt(formData.publish) || 0,
            content: formData.content,
            updateTime: new Date().getTime(),
        }, formData.id)

        if (categoryResult) {
            result.success = true;
            result.data = categoryResult;
        } else {
            result.code = 'FAIL_USER_NO_EXIST';
            result.message = userCode.FAIL_USER_NO_EXIST;
        }
        ctx.body = result;
    }
}

module.exports = CategoryController;