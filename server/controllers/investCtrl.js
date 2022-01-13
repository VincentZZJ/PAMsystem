/*
 * @Author: Vincent
 * @Date: 2022-01-10 15:45:22
 * @LastEditTime: 2022-01-12 16:56:02
 * @LastEditors: Vincent
 * @Description:
 */
const {
  addInvestItemModel,
  getInvestListByOptionsModel,
  deleteInvestItemByIdModel,
  addInvestRecordModel,
} = require('../models/investModel');
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

/**
 * @description: 根据Id删除投资项
 * @param {*} ctx
 * @return {*}
 */
const deleteInvestItemByIdCtrl = async (ctx) => {
  const { id } = ctx.request.query;
  try {
    const result = await deleteInvestItemByIdModel(id);
    if (result) {
      ctx.body = setResponseBody({});
    } else {
      ctx.body = setResponseBody({}, '-1', '删除失败');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

const addInvestRecordCtrl = async (ctx) => {
  const { id, date, investOpt, investCost, investNum, latestCost, totalMoney, profit } =
    ctx.request.body;
  try {
    const result = await addInvestRecordModel({
      id,
      date,
      investOpt,
      investCost,
      investNum,
      latestCost,
      totalMoney,
      profit,
    });
    if (result) {
      ctx.body = setResponseBody();
    } else {
      ctx.body = setResponseBody({}, '-1', '操作失败');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

module.exports = {
  addInvestItemCtrl,
  getInvestListByOptionsCtrl,
  deleteInvestItemByIdCtrl,
  addInvestRecordCtrl,
};
