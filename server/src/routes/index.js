const router = require('koa-router')();

const user = require('./user');
const article = require('./article');
const category = require('./category');
const front = require('./front');

router.use('/api', user.routes(), user.allowedMethods());
router.use('/api', article.routes(), article.allowedMethods());
router.use('/api', category.routes(), category.allowedMethods());
router.use('/api', front.routes(), front.allowedMethods());

module.exports = router