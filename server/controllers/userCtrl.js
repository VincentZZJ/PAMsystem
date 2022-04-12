/*
 * @Author: Vincent
 * @Date: 2021-12-07 14:10:37
 * @LastEditTime: 2022-04-07 17:28:48
 * @LastEditors: Vincent
 * @Description:
 */
const {
  getUserByUserphoneModel,
  addUserInfoModel,
  delUserByIdModel,
  updateUserInfoModel,
} = require('../models/userModel');
const { setResponseBody } = require('../utils/utils');
const fsPromise = require('fs').promises;
const path = require('path');
const Redis = require('koa-redis');

// 新建redis客户端
const Store = new Redis().client;

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
      await Store.set(result.id, JSON.stringify(result));
      // await Store.expire(result.id, 60);  // 暂时不定时
      ctx.body = setResponseBody({ phone, username: result.username, userId: result.id });
      ctx.cookies.set('userId', result.id);
    } else {
      ctx.body = setResponseBody({}, '-1', '账号密码错误');
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
    if (result && result.phone === phone) {
      ctx.body = setResponseBody({ phone, username: result.username, userId: result.id });
    } else {
      ctx.body = setResponseBody({}, '-1', result.desc);
    }
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
    if (result.phone === phone) {
      const newPath = path.join(__dirname, `../statics/databackup/pamid_${result.phone}`);
      await fsPromise.mkdir(newPath);
      ctx.body = setResponseBody(result);
    } else {
      ctx.body = setResponseBody({}, '-1', result.desc);
    }
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
    if (result) {
      ctx.body = setResponseBody();
    } else {
      ctx.body = setResponseBody({}, '-1', '删除失败');
    }
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
