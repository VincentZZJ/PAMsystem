const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invest_record', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "操作主键"
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "成交时间"
    },
    investOpt: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "操作类型：0-买入；1-加仓；2-减仓；3-清仓"
    },
    investCost: {
      type: DataTypes.DOUBLE(13,3),
      allowNull: false,
      comment: "成交价格"
    },
    investNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "成交数量"
    },
    latestCost: {
      type: DataTypes.DOUBLE(13,3),
      allowNull: false,
      comment: "成交后成本"
    }
  }, {
    sequelize,
    tableName: 'invest_record',
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
