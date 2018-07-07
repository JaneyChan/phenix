const dbUtils = require('../utils/db');

class UserModal {
  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  static async getOneByUserNameAndPassword( options ) {
    let _sql = `
    SELECT * from user
      where username="${options.username}" and password="${options.password}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
}

module.exports = UserModal;
