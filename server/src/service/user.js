const userModal = require('../models/user');

class UserService {

  /**
   * 根据用户名获取用户信息
   * @param {String} username
   */
  static async getUserByUserName(username) {
    let result = await userModal.getUserByUserName(username);
    return result;
  }
}

module.exports = UserService;
