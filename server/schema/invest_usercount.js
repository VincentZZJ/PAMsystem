const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invest_usercount', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    userId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "用户ID"
    },
    stockCount: {
      type: DataTypes.DOUBLE(20,3),
      allowNull: true,
      comment: "股票账户-余额"
    },
    fundCount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "基金账户-余额"
    }
  }, {
    sequelize,
    tableName: 'invest_usercount',
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
