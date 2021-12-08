/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:06:31
 * @LastEditTime: 2021-12-08 09:10:35
 * @LastEditors: Vincent
 * @Description:
 */
const Mysql = require('../config/mysql');
const UUID = require('node-uuid');
const User = Mysql.user;

// 根据条件获取用户数据
const getUserByUsername = async (name) => {
  const userInfo = await User.findOne({
    where: {
      username: name,
    },
  });
  return userInfo;
};

// 新增用户
const addUserInfo = async (data) => {
  const { username, password } = data;
  // 先验证信息是否重复(手机号等)
  const checkInfo = await User.findOne({
    where: {
      username: username,
    },
  });
  if (checkInfo) {
    console.log('用户存在');
    return { err: '用户已存在' };
  }
  const isAdd = await User.create({
    id: UUID.v1(),
    username,
    password,
  });
  return isAdd && isAdd.dataValues;
};

// 根据Id删除用户
const delUserById = async (id) => {
  const result = await User.destroy({
    where: {
      id: id,
    },
  });
  return result;
};

// 根据用户Id更新信息
const updateUserInfo = async (data) => {
  const result = await User.update(
    { username: data.username },
    {
      where: {
        id: data.id,
      },
    },
  );
  return result;
};

module.exports = {
  getUserByUsername,
  addUserInfo,
  delUserById,
  updateUserInfo,
};
