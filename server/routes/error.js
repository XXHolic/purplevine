const router = require('koa-router')()
const {dbQuery,dbAdd} = require('../db');
const {tableNameMap} = require('../constants');

// router.prefix('/api/issue')

router.post('/', async function (ctx, next) {
  let reqBody = ctx.request.body;
  const {eventId,type,exception} = reqBody;
  const result = await dbQuery(tableNameMap.issue,{query:{eventId:eventId}});
  if (result.data && !result.data.length) {
    await dbAdd(tableNameMap.issue,{data:[{eventId,type,exception}]});
    await dbAdd(tableNameMap.issueDetail,{data:[reqBody]});
  }
  ctx.body = 'success'
})

module.exports = router
