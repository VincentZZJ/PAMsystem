/*
 * @Author: Vincent
 * @Date: 2022-01-10 15:45:22
 * @LastEditTime: 2022-01-11 14:48:05
 * @LastEditors: Vincent
 * @Description:
 */
const { addInvestItemModel, getInvestListByOptionsModel } = require('../models/investModel');
const { setResponseBody } = require('../utils/utils');

/**
 * @description: 新增投资项
 * @param {*} ctx
 * @return {*}
 */
const addInvestItemCtrl = async (ctx) => {
  const { investType, investName, buyTime, buyCost, totalMoney } = ctx.request.body;
  try {
    const result = await addInvestItemModel({
      investType,
      investName,
      buyTime,
      buyCost,
      totalMoney,
    });
    if (result && result.id) {
      ctx.body = setResponseBody({});
    } else {
      ctx.body = setResponseBody({}, '-1', result.desc);
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 根据条件获取投资项
 * @param {*} ctx
 * @return {*}
 */
const getInvestListByOptionsCtrl = async (ctx) => {
  const searchDict = ['investName', 'buyTime', 'investType'];
  const { currentPage, pageSize, ...data } = ctx.request.query;
  const params = {};
  Object.keys(data).forEach((item) => {
    if (searchDict.includes(item)) {
      params[item] = data[item];
    }
  });
  try {
    if (currentPage && pageSize) {
      const result = await getInvestListByOptionsModel({
        params,
        pagination: { currentPage, pageSize },
      });
      if (result) {
        ctx.body = setResponseBody(result);
      } else {
        ctx.body = setResponseBody({}, '-1', result.desc);
      }
    } else {
      ctx.body = setResponseBody({}, '-1', '请求参数有误，丢失页码信息');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

module.exports = {
  addInvestItemCtrl,
  getInvestListByOptionsCtrl,
};
