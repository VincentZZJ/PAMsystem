const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat_room', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "roomId聊天室id"
    },
    roomName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "聊天室名称"
    },
    msgSavePath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "聊天文件存储路径"
    },
    roomImg: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "聊天室头像"
    },
    latestMsg: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "最新消息"
    },
    latestMsgTime: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "最新消息时间"
    }
  }, {
    sequelize,
    tableName: 'chat_room',
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
