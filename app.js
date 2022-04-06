/*
 * @Author: Vincent
 * @Date: 2021-12-06 14:24:17
 * @LastEditTime: 2022-03-31 16:05:21
 * @LastEditors: Vincent
 * @Description:
 */
// require('babel-polyfill');
// require('babel-register');
// require('@babel/plugin-proposal-decorators');

const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const koaStatic = require('koa-static');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const Redis = require('koa-redis');
// const ws = require('nodejs-websocket');
// const { createServer } = require('http');
// const { Server } = require('socket.io');
const router = require('./server/routes/index');
const WS = require('./server/websocket');

// const { createServer } = require('http');

// const app = new Koa();
// const httpServer = createServer(app.callback());

// 链接redis
app.keys = ['keys', 'pamsystem']; // session 加密处理
app.use(
  session({
    key: 'vincent',
    prefix: 'vz',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new Redis(),
  }),
);

// 中间件
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(json());
app.use(logger());

// 构建websocket服务
const ws = new WS();
ws.createServer();
// console.log(WS.prototype.createServer());

// 配置静态资源目录
app.use(koaStatic(__dirname + '/server/statics'));

// 日志
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms
  `);
});

// 引入路由
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// 运行
app.listen(8889, () => {
  console.log('server is running at 8889....');
});

// 创建websocket服务监听
// const httpServer = require('http').createServer(app.callback());
// const io = require('socket.io')(httpServer);
// // io.path('/chatroom_socket');
// io.on('connection', (socket) => {
//   console.log(socket);
//   socket.on('login', (data) => console.log(data));
// });
// httpServer.listen(3030, () => console.log('listening on 3030...'));

// const wsServer = ws
//   .createServer((socket) => {
//     console.log(socket);
//   })
//   .listen(3030);

module.exports = app;
