/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:10:37
 * @LastEditTime: 2021-12-08 09:33:09
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

const getUserInfo = async (ctx) => {
  const { username } = ctx.request.query;
  try {
    const result = await getUserByUsername(username);
    ctx.body = setResponseBody(result);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

const addUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const result = await addUserInfo({ username, password });
    ctx.body = setResponseBody(result);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

const delUser = async (ctx) => {
  const { id } = ctx.request.query;
  try {
    const result = await delUserById(id);
    ctx.body = setResponseBody(result);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

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
