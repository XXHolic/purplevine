var formidable = require('formidable');
// const https = require('https');
// var util = require('util');
// var db = require('./sql/db');
// import client from './db';

module.exports = {
  index: (ctx) => {
    ctx.body = 'Hello Koa';
    // res.setHeader("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    // res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");


    // var sql = 'select * from log';
    // db(sql,[], (data) => {
    //   // console.log('data',data);
    //   res.writeHead(200, "ok");
    //   res.write("Hello Node Server");
    //   res.end();
    // })

  },

};
