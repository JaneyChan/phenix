const router = require('koa-router')();

const user = require('./user');
const article = require('./article');

router.use('/api', user.routes(), user.allowedMethods());
router.use('/api', article.routes(), article.allowedMethods());

module.exports = router