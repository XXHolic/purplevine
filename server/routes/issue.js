const router = require('koa-router')()
const {dbQuery,dbAdd,dbDelete,dbUpdate} = require('../db');
const {tableNameMap} = require('../constants');

// router.prefix('/api/issue')

router.get('/', function (ctx, next) {
  ctx.body = 'all'
})
router.get('/list', async function (ctx, next) {
  // let reqBody = ctx.request.body;
  // const {eventId,type} = reqBody;
  const list = await dbQuery(tableNameMap.issue,{query:{}});

  ctx.body = list;

})


module.exports = router
