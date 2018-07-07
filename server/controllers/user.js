const userService = require('../services/user');
const userCode = require('../codes/user');
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const tokenSecret = require('../config').jwt.secret
const tokenExprisesIn = require('../config').jwt.exprisesIn

class UserController {
	/**
	 * 登录操作
	 * @param  {obejct} ctx 上下文对象
	 */
	static async signIn( ctx ) {
		// let formData = ctx.request.body
		let formData = ctx.request.query
		let result = {
			success: false,
			message: '',
			data: null,
			code: ''
		}
		console.log(formData)
		let userResult = await userService.signIn( formData )

		console.log(userResult)
		if (userResult) {
			if (formData.username == userResult.username && await bcrypt.compare(body.password, user.password)) {
				result.success = true;
                delete userResult.password
				result.data = {
                    user: userResult,
                    token: jsonwebtoken.sign({data: userResult, exp: Math.floor(Date.now()/1000)+tokenExprisesIn}, secret)
                }
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

    /**
     * 退出登录
	 * @param  {obejct} ctx 上下文对象
     */
    static async signOut( ctx ) {

    }
}

module.exports = UserController;
