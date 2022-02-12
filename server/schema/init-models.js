var DataTypes = require("sequelize").DataTypes;
var _attachment_list = require("./attachment_list");
var _diary_list = require("./diary_list");
var _invest_history = require("./invest_history");
var _invest_item = require("./invest_item");
var _invest_moneyflowing = require("./invest_moneyflowing");
var _invest_record = require("./invest_record");
var _invest_usercount = require("./invest_usercount");
var _sys_user = require("./sys_user");

function initModels(sequelize) {
  var attachment_list = _attachment_list(sequelize, DataTypes);
  var diary_list = _diary_list(sequelize, DataTypes);
  var invest_history = _invest_history(sequelize, DataTypes);
  var invest_item = _invest_item(sequelize, DataTypes);
  var invest_moneyflowing = _invest_moneyflowing(sequelize, DataTypes);
  var invest_record = _invest_record(sequelize, DataTypes);
  var invest_usercount = _invest_usercount(sequelize, DataTypes);
  var sys_user = _sys_user(sequelize, DataTypes);


  return {
    attachment_list,
    diary_list,
    invest_history,
    invest_item,
    invest_moneyflowing,
    invest_record,
    invest_usercount,
    sys_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
