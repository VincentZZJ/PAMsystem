const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invest_item', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "数据id"
    },
    investType: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "投资类型：1-股票；2-基金；3-定期"
    },
    investName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "投资名称"
    },
    buyTime: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "买入时间"
    },
    buyNum: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "买入数量"
    },
    buyCost: {
      type: DataTypes.DOUBLE(13,3),
      allowNull: false,
      comment: "买入成本"
    },
    totalMoney: {
      type: DataTypes.DOUBLE(14,4),
      allowNull: false,
      comment: "投资金额"
    },
    sellTime: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "卖出时间"
    },
    sellCost: {
      type: DataTypes.DOUBLE(13,3),
      allowNull: true,
      comment: "卖出价格"
    },
    profit: {
      type: DataTypes.DOUBLE(14,4),
      allowNull: true,
      comment: "盈亏"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "投资状态：1-进行中 0-已结束"
    }
  }, {
    sequelize,
    tableName: 'invest_item',
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
