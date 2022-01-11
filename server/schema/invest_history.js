const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'invest_history',
    {
      itemId: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '投资项id',
      },
      recordId: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '投资操作id',
      },
    },
    {
      sequelize,
      tableName: 'invest_history',
      timestamps: false,
    },
  );
};
