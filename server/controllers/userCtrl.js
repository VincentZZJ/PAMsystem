/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:10:37
 * @LastEditTime: 2021-12-16 19:22:04
 * @LastEditors: Vincent
 * @Description:
 */
const {
  getUserByUsername,
  addUserInfo,
  delUserById,
  updateUserInfo,
} = require('../models/userModel');
const { setResponseBody } = require('../utils/utils');

/**
 * @description: 根据用户姓名获取用户信息
 * @param {*} ctx
 * @return {*}
 */
const getUserInfo = async (ctx) => {
  const { username } = ctx.request.query;
  try {
    const result = await getUserByUsername(username);
    ctx.body = setResponseBody(result);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 录入用户信息
 * @param {*} ctx
 * @return {*}
 */
const addUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const result = await addUserInfo({ username, password });
    ctx.body = setResponseBody(result);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 根据用户ID删除用户
 * @param {*} ctx
 * @return {*}
 */
const delUser = async (ctx) => {
  const { id } = ctx.request.query;
  try {
    const result = await delUserById(id);
    ctx.body = setResponseBody(result);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 根据用户ID更新用户数据
 * @param {*} ctx
 * @return {*}
 */
const updateUserInfoById = async (ctx) => {
  const { id, username, password } = ctx.request.body;
  try {
    const result = await updateUserInfo({ id, username, password });
    if (result.length && result[0] === 1) {
      ctx.body = setResponseBody();
    } else {
      ctx.body = setResponseBody({ info: '未找到用户' });
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

module.exports = {
  getUserInfo,
  addUser,
  delUser,
  updateUserInfoById,
};
