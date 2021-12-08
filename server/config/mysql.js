/*
 * @Author: Vincent
 * @Date: 2021-12-07 09:51:44
 * @LastEditTime: 2021-12-07 14:38:21
 * @LastEditors: Vincent
 * @Description: 链接数据库，并实例化导出数据模型
 */
const Sequelize = require('sequelize');
const initModels = require('../schema/init-models');

const PamDatabase = new Sequelize('mysql://root:123456@localhost/pamdatabase', {
  define: {
    timestamps: false,
  },
});

const Mysql = initModels(PamDatabase);

module.exports = Mysql;
