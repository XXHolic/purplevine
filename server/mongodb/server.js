const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const app = new Koa();
var http = require('http').createServer(app.callback());
const routes = require("./routes/index");
const { port } = require('./constants');

app.use(cors())
app.use(bodyParser());

app.use(routes.routes(), routes.allowedMethods())

// app.use(async ctx => {
//   const {request,response} = ctx;
//   console.info('url',request.url)
//   if (request.url === "/favicon.ico") {
//     response.redirect("https://xxholic.github.io/lab/icon.ico");
//     return;
//   }

//   // console.info('request.url',request.url)
//   if (request.url.indexOf('socket.io') > -1) {
//     return;
//   }

//   if (request.url === "/error.png") {
//     // router['error'](ctx);
//     return;
//   }

// });

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


