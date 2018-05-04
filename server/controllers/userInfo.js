const userService = require('../services/userInfo');
const userCode = require('../codes/user');

class UserController {
	/**
	 * 登录操作
	 * @param  {obejct} ctx 上下文对象
	 */
	static async signIn( ctx ) {
		let formData = ctx.request.body
		let result = {
			success: false,
			message: '',
			data: null,
			code: ''
		}
		let userResult = await userService.signIn( formData )

		if ( userResult ) {
			if ( formData.username === userResult.name ) {
				result.success = true;
				result.data = userResult;
			} else {
				result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
				result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR';
			}
		} else {
			result.code = 'FAIL_USER_NO_EXIST';
			result.message = userCode.FAIL_USER_NO_EXIST;
		}
		ctx.body = result;
	}
}

module.exports = UserController;