const router = require('koa-router')()
const sqlConnect = require('../db');
const { tableNameMap } = require('../constants');

// router.prefix('/api/issue')

router.get('/', function (ctx, next) {
  ctx.body = 'all'
})
router.get('/list', async function (ctx, next) {
  const sql = 'SELECT * FROM note_list';
  const list = await sqlConnect(sql);
  console.info('list', list)
  ctx.body = list;
})


module.exports = router
