const articleService = require('../services/article');
const userCode = require('../codes/user');

class ArticleController {
	/**
	 * 获取文章列表
	 */
    static async getArticles(ctx) {
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        let articleResult = await articleService.getArticles()

        if (articleResult) {
            result.success = true;
            result.data = articleResult;
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
    static async createArticle(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        let articleResult = await articleService.createArticle({
            title: formData.title,
            publish: 0,
            createTime: new Date().getTime(),
        })

        if (articleResult) {
            result.success = true;
            result.data = articleResult;
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
    static async updateArticle(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        let articleResult = await articleService.updateArticle({
            id: formData.id,
            title: formData.title,
            publish: parseInt(formData.publish),
            content: formData.content,
            updateTime: new Date().getTime(),
        })

        if (articleResult) {
            result.success = true;
            result.data = articleResult;
        } else {
            result.code = 'FAIL_USER_NO_EXIST';
            result.message = userCode.FAIL_USER_NO_EXIST;
        }
        ctx.body = result;
    }
}

module.exports = ArticleController;