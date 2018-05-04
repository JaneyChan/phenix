const articleService = require('../services/article');
const userCode = require('../codes/user');

class ArticleController {
	/**
	 * 登录操作
	 * @param  {obejct} ctx 上下文对象
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
}

module.exports = ArticleController;