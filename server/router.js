var formidable = require('formidable');
var util = require('util');
var db = require('./db');
// import client from './db';

module.exports = {
  index: function(req, res) {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    // res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");


    var sql = 'select * from note_list';
    db(sql,[], (data,fields) => {
      console.log('data',data);
      console.log('fields',fields);
      res.writeHead(200, "ok");
      res.write("Hello Node Server");
      res.end();
    })
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
