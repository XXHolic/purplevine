var http = require("http");
var url = require("url");
var router = require("./router");
const querystring = require("querystring");
var port = 9001;

var server = http.createServer(function(req, res) {
  if (req.url !== "/favicon.ico") {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname; //得到请求的路径
    pathname = pathname.replace(/\//, ""); //替换掉前面的 /
    pathname = pathname?pathname:'index';

    var queryObj = querystring.parse(req.url.split("?")[1]);
    // console.log('pathname',pathname);
    router[pathname](req, res, queryObj);
  } else {
      res.writeHead(302, {
        Location: "http://www.xholic.cn/favicon.ico"
      });
      res.end();
  }
});

server.listen(port);
console.log("The node server can run: http://localhost:9001");
