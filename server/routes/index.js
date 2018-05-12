const router = require('koa-router')();

const user = require('./user');
const article = require('./article');
const category = require('./category');

router.use('/api', user.routes(), user.allowedMethods());
router.use('/api', article.routes(), article.allowedMethods());
router.use('/api', category.routes(), category.allowedMethods());

module.exports = router