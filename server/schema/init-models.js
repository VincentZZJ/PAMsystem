var DataTypes = require('sequelize').DataTypes;
var _invest_history = require('./invest_history');
var _invest_item = require('./invest_item');
var _invest_record = require('./invest_record');
var _sys_user = require('./sys_user');

function initModels(sequelize) {
  var invest_history = _invest_history(sequelize, DataTypes);
  var invest_item = _invest_item(sequelize, DataTypes);
  var invest_record = _invest_record(sequelize, DataTypes);
  var sys_user = _sys_user(sequelize, DataTypes);

  return {
    invest_history,
    invest_item,
    invest_record,
    sys_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
