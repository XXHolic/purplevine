const router = require('koa-router')()

// router.prefix('/api/issue')

router.get('/', function (ctx, next) {
  ctx.body = 'all'
})
router.get('/list', function (ctx, next) {
  ctx.body = {
    code: 200
  }
})


module.exports = router
