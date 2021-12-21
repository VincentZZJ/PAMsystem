/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:10:37
 * @LastEditTime: 2021-12-21 15:54:06
 * @LastEditors: Vincent
 * @Description:
 */
const {
  getUserByUserphoneModel,
  addUserInfoModel,
  delUserByIdModel,
  updateUserInfoModel,
} = require('../models/userModel');
const UUID = require('node-uuid');
const { setResponseBody } = require('../utils/utils');

/**
 * @description: 登录
 * @param {*} ctx
 * @return {*}
 */
const userLoginCtrl = async (ctx) => {
  const { phone, password } = ctx.request.body;
  try {
    const result = await getUserByUserphoneModel(phone);
    if (result && result.password === password) {
      ctx.body = setResponseBody({ phone, username: result.username, token: result.id });
    } else {
      ctx.body = setResponseBody({}, '-1', '登录失败');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 根据用户手机获取用户信息
 * @param {*} ctx
 * @return {*}
 */
const getUserInfoCtrl = async (ctx) => {
  const { phone } = ctx.request.query;
  try {
    const result = await getUserByUserphoneModel(phone);
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
const addUserCtrl = async (ctx) => {
  const { username, password, phone } = ctx.request.body;
  try {
    const result = await addUserInfoModel({ username, password, phone });
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
const delUserCtrl = async (ctx) => {
  const { id } = ctx.request.query;
  try {
    const result = await delUserByIdModel(id);
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
const updateUserInfoByIdCtrl = async (ctx) => {
  const { id, username, password, phone } = ctx.request.body;
  try {
    const result = await updateUserInfoModel(id, { username, password, phone });
    if (result.length && result[0] === 1) {
      ctx.body = setResponseBody();
    } else {
      ctx.body = setResponseBody({ desc: '未找到用户' });
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

module.exports = {
  getUserInfoCtrl,
  addUserCtrl,
  delUserCtrl,
  updateUserInfoByIdCtrl,
  userLoginCtrl,
};
