const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const app = new Koa();
var http = require('http').createServer(app.callback());
const routes = require("./routes/index");
const { serverPort } = require('./constants');

app.use(cors())
app.use(bodyParser());
app.use(routes.routes(), routes.allowedMethods())

app.on('error', err => {
  console.log('server error', err)
});

http.listen(serverPort);

const io = require('socket.io')(http);
io.on('connection', (socketServer) => {
  // console.info('connection ready~~')
  socketServer.on('npmStop', (data) => {
    process.exit(0);
  });
});

const msg = `The node server is running: http://localhost:${serverPort}`;
console.log(msg);

// var server = http.createServer(function (req, res) {
//   if (req.url !== "/favicon.ico") {
//     var urlObj = url.parse(req.url);
//     var pathname = urlObj.pathname; //得到请求的路径
//     pathname = pathname.replace(/\//, ""); //替换掉前面的 /
//     pathname = pathname ? pathname : 'index';

//     var queryObj = querystring.parse(req.url.split("?")[1]);
//     // console.log('pathname',pathname);
//     router[pathname](req, res, queryObj);
//   } else {
//     res.writeHead(302, {
//       Location: "http://www.xholic.cn/favicon.ico"
//     });
//     res.end();
//   }
// });
