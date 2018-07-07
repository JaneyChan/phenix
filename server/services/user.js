const userModel = require('../models/user');

const user = {
    /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn( formData ) {
    let resultData = await userModel.getOneByUserNameAndPassword({
      'username': formData.username,
      'password': formData.password
    })
    return resultData
  }
}

module.exports = user;
