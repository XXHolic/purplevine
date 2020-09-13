var formidable = require('formidable');
const {tableNameMap} = require('../server/constants');
// const https = require('https');
// var util = require('util');
const {dbQuery,dbAdd,dbDelete,dbUpdate} = require('./db');
// import client from './db';

module.exports = {
  index: (ctx) => {

    ctx.body = 'Hello Koa';

  },
  error: (ctx) => {
    const {request,response} = ctx;
    let reqBody = ctx.request.body;
    const {eventId,type,exception} = reqBody;
    // console.log(body)
    ctx.status = 200;
    ctx.body='success'
    dbQuery(tableNameMap.issue,{query:{eventId:eventId}}).then((result) => {
      // console.log('result',result)
      if (!result.length) {
        dbAdd(tableNameMap.issue,{data:[{eventId,type,exception}]}).then(()=>{

        });
        dbAdd(tableNameMap.issueDetail,{data:[reqBody]});
      }
    })
  }

};
