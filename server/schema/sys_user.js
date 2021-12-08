/*
 * @Author: Vincent
 * @Date: 2021-12-07 09:47:44
 * @LastEditTime: 2021-12-07 14:38:39
 * @LastEditors: Vincent
 * @Description:
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sys_user',
    {
      id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
        comment: '主键Id',
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '用户名',
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '密码',
      },
    },
    {
      sequelize,
      tableName: 'sys_user',
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
