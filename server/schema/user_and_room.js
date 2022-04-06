const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_and_room', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "关联id"
    },
    userId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "用户id"
    },
    roomId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "聊天室id"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "状态：1-有效数据  2-无效数据"
    }
  }, {
    sequelize,
    tableName: 'user_and_room',
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
