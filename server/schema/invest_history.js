const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invest_history', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    itemId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "投资项id"
    },
    recordId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "投资操作id"
    }
  }, {
    sequelize,
    tableName: 'invest_history',
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
