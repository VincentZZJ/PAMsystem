/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:06:31
 * @LastEditTime: 2022-01-12 17:02:35
 * @LastEditors: Vincent
 * @Description:
 */
const { Mysql } = require('../config/mysql');
const UUID = require('node-uuid');
const User = Mysql.sys_user;

// 根据条件获取用户数据
const getUserByUserphoneModel = async (phone) => {
  const userInfo = await User.findOne({
    where: {
      phone: phone,
    },
  });
  if (userInfo) {
    return userInfo.dataValues;
  }
  return {
    desc: '没有找到该用户',
  };
};

// 新增用户
const addUserInfoModel = async (data) => {
  const { username, password, phone } = data;
  // 先验证信息是否重复(手机号等)
  const checkInfo = await User.findOne({
    where: {
      phone: phone,
    },
  });
  if (checkInfo) {
    console.log('用户存在');
    return { desc: '用户已存在' };
  }
  const isAdd = await User.create({
    id: UUID.v1(),
    username,
    password,
    phone,
  });
  return isAdd && isAdd.dataValues;
};

// 根据Id删除用户
const delUserByIdModel = async (id) => {
  const result = await User.destroy({
    where: {
      id: id,
    },
  });
  return result;
};

// 根据用户Id更新信息
const updateUserInfoModel = async (id, data) => {
  const result = await User.update(
    { ...data },
    {
      where: {
        id: id,
      },
    },
  );
  return result;
};

module.exports = {
  getUserByUserphoneModel,
  addUserInfoModel,
  delUserByIdModel,
  updateUserInfoModel,
};
