const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invest_moneyflowing', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    userId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "用户Id"
    },
    investType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "账户类型 1-股票 2-基金"
    },
    moneyOpt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "银证转账操作 1-转入 0-转出"
    },
    money: {
      type: DataTypes.DOUBLE(20,3),
      allowNull: false,
      comment: "流水金额"
    },
    restMoney: {
      type: DataTypes.DOUBLE(20,3),
      allowNull: false,
      comment: "账户余额"
    },
    createDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "操作时间"
    }
  }, {
    sequelize,
    tableName: 'invest_moneyflowing',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
