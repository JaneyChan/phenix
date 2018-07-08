/**
 * 逻辑文案管理
 */

const message = {
  ERROR_SYS: '服务器异常',
  FAIL_USER_NAME_OR_PASSWORD_ERROR: '用户名或登录密码错误',
  FAIL_USER_NO_LOGIN: '请先登录',
  FAIL_USER_NO_EXIST: '用户不存在'
}

const code = {

  SUCCESS_CODE: 200, // 成功
  ERROR_CODE: 500, // 服务器异常
  ERROR_LOGIN_CODE: 401, // 未登录
}


module.exports = {
  message,
  code
}
