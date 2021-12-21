var DataTypes = require('sequelize').DataTypes;
var _sys_user = require('./sys_user');

function initModels(sequelize) {
  var sys_user = _sys_user(sequelize, DataTypes);

  return {
    sys_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
