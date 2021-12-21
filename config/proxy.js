/*
 * @Author: Vincent
 * @Date: 2021-12-06 10:50:51
 * @LastEditTime: 2021-12-21 17:10:23
 * @LastEditors: Vincent
 * @Description:
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      target: 'https://preview.pro.ant.design',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
    '/pamsystem/': {
      target: 'http://localhost:8889',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  // pre: {
  //   '/pamsystem/': {
  //     target: 'localhost:8889',
  //     changeOrigin: false,
  //     pathRewrite: {
  //       '^': '',
  //     },
  //   },
  // },
};
