const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const app = new Koa();
var http = require('http').createServer(app.callback());
const router = require("./router");
const {port} = require('../server/constants');

app.use(cors())
app.use(bodyParser());

app.use(async ctx => {
  const {request,response} = ctx;
  // console.info('url',request.url)
  if (request.url === "/favicon.ico") {
    response.redirect("https://xxholic.github.io/lab/icon.ico");
    return;
  }

  // console.info('request.url',request.url)
  if (request.url.indexOf('socket.io') > -1) {
    return;
  }

  if (request.url === "/error.png") {
    router['error'](ctx);
    return;
  }

  let pathname = request.URL.pathname; //得到请求的路径
  pathname = pathname.replace(/\//, ""); //替换掉前面的 /
  pathname = pathname?pathname:'index';
  // console.log('pathname',pathname);
  if (router[pathname]) {
    router[pathname](ctx);
  }

});

app.on('error', err => {
  console.log('server error', err)
});

http.listen(port);


const io = require('socket.io')(http);
io.on('connection', (socketServer) => {
  // console.info('connection ready~~')
  socketServer.on('npmStop', (data) => {
    process.exit(0);
  });
});

const msg = `The node server is running: http://localhost:${port}`;
console.log(msg);
