const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'attachment_list',
    {
      id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
        comment: '附件id',
      },
      diaryId: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '日记id',
      },
      fileId: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '文件id',
      },
      isDel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '文件是否被删除(1- 已删除，0 - 未删除 )',
      },
    },
    {
      sequelize,
      tableName: 'attachment_list',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
