/*
 * @Author: Vincent
 * @Date: 2021-12-06 14:24:17
 * @LastEditTime: 2021-12-07 15:21:56
 * @LastEditors: Vincent
 * @Description:
 */
// require('babel-polyfill');
// require('babel-register');
// require('@babel/plugin-proposal-decorators');

const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./server/routes/index');

// 中间件
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(json());
app.use(logger());

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

module.exports = app;
