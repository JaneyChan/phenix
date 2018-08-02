const secret = require('../utils/config').jwt.secret;
const jsonwebtoken = require('jsonwebtoken');

const checkAuth = async (ctx, next) => {
  const token = ctx.cookies.get('token');
    if (token) {
      try {
        let decoded = jsonwebtoken.verify(token, secret);
        let deadline = new Date() / 1000;
        if (decoded.exp <= deadline) {
          console.log('expired token');
          ctx.throw(401, 'expired token');
        } else {
          await next();
        }
      } catch (err) {
        ctx.throw(401, 'expired token');
      }
    } else {
      ctx.throw(401, 'no token detected in http header Authorization');
    }
}

module.exports = checkAuth;