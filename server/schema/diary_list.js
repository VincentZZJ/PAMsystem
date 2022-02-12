const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diary_list', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "日记id(userid拼接该日时间戳)"
    },
    userId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "用户id"
    },
    diaryTitle: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: "日记标题"
    },
    diaryContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "日记内容"
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "日记时间"
    },
    diaryTag: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "日记标签(待用字段)"
    },
    isDel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "是否已删除(1-已删 ， 0-未删)"
    }
  }, {
    sequelize,
    tableName: 'diary_list',
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
