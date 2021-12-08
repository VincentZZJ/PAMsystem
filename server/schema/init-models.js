/*
 * @Author: Vincent
 * @Date: 2021-12-07 09:47:44
 * @LastEditTime: 2021-12-07 14:28:55
 * @LastEditors: Vincent
 * @Description:
 */
var DataTypes = require('sequelize').DataTypes;
var _sys_user = require('./sys_user');

function initModels(sequelize) {
  var sys_user = _sys_user(sequelize, DataTypes);

  return {
    user: sys_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
