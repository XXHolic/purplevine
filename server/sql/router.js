var formidable = require('formidable');
const https = require('https');
// var util = require('util');
var db = require('./db');
// import client from './db';

module.exports = {
  index: function(req, res) {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    // res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");


    var sql = 'select * from log';
    db(sql,[], (data) => {
      // console.log('data',data);
      res.writeHead(200, "ok");
      res.write("Hello Node Server");
      res.end();
    })

    const options = {
      hostname: 'api.bilibili.com',
      port: 443,
      path: '/x/player/playurl?bvid=BV1y7411Q7Eq&cid=171776208&qn=112',
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "origin":"https://www.bilibili.com",
        "referer":"https://www.bilibili.com",
      }
    };

    https.request(options, function(res) {
      console.log('res:', res);
      console.log('状态码:', res.statusCode);
      console.log('请求头:', res.headers);
    }).on('error', (e) => {
      console.error('error',e);
    });

  },
  simpleCrossOriginRequest: function(req, res) {
    var data = JSON.stringify({
      code: 200,
      data: {
        simpleCrossOrigin: true
      }
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,OPTIONS"
    );
    res.writeHead(200, "ok");
    res.end(data);
  },
  notSimpleCrossOriginRequest: function(req, res) {
    var data = JSON.stringify({
      code: 200,
      data: {
        notSimpleCrossOrigin: true
      }
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,OPTIONS"
    );
    res.writeHead(200, "ok");
    res.end(data);
  },
  jsonp: function(req, res, queryObj) {
    var data = JSON.stringify({ isJSONP: true });
    var callBack = queryObj.callBack;
    // console.log(callBack);
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.writeHead(200, "ok");
    var backData = callBack + "(" + data + ")";
    res.end(backData);
  },
  upload: function(req, res, queryObj) {


    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      var data = JSON.stringify({
        code: 200,
        data: {fields: fields, files: files}
      });

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS"
      );
      res.writeHead(200,'ok');
      res.end(data);
    });

    return;
  }
};
