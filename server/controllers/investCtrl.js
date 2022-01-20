/*
 * @Author: Vincent
 * @Date: 2022-01-10 15:45:22
 * @LastEditTime: 2022-01-20 14:01:00
 * @LastEditors: Vincent
 * @Description:
 */
const {
  addInvestItemModel,
  getInvestListByOptionsModel,
  deleteInvestItemByIdModel,
  addInvestRecordModel,
  updateLatestPriceModel,
} = require('../models/investModel');
const Koa2Req = require('koa2-request');
const { setResponseBody } = require('../utils/utils');

/**
 * @description: 新增投资项
 * @param {*} ctx
 * @return {*}
 */
const addInvestItemCtrl = async (ctx) => {
  const { investType, investName, buyTime, buyPrice, totalInvest, position, code, userid } =
    ctx.request.body;
  try {
    const result = await addInvestItemModel({
      investType,
      investName,
      buyTime,
      buyPrice,
      totalMoney: totalInvest,
      totalInvest,
      position,
      cost: buyPrice,
      code,
      userid,
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
  const searchDict = ['investName', 'buyTime', 'investType', 'userid'];
  const { currentPage, pageSize, ...data } = ctx.request.query;
  const params = {};
  Object.keys(data).forEach((item) => {
    if (searchDict.includes(item)) {
      params[item] = data[item];
    }
  });
  try {
    if (params.userid && currentPage && pageSize) {
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
      ctx.body = setResponseBody({}, '-1', '请求参数有误');
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

/**
 * @description: 新增投资操作记录
 * @param {*} ctx
 * @return {*}
 */
const addInvestRecordCtrl = async (ctx) => {
  const { id, date, investOpt, investCost, investNum, latestCost, totalInvest, profit, position } =
    ctx.request.body;
  try {
    const result = await addInvestRecordModel({
      id,
      date,
      investOpt,
      investCost,
      investNum,
      latestCost,
      profit,
      position,
      totalInvest,
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

/**
 * @description: 更新单价
 * @param {*} ctx
 * @return {*}
 */
const updateLatestPriceCtrl = async (ctx) => {
  const { id, code, cost, position } = ctx.request.query;
  try {
    const latestRes = await Koa2Req(`http://hq.sinajs.cn/list=${code}`);
    if (latestRes.body) {
      const latestInfo = latestRes.body.split('=')[1].split(',');
      const latestPrice = parseFloat(latestInfo[3]);
      const profit = (latestPrice - parseFloat(cost)) * parseInt(position);
      const totalMoney = latestPrice * parseInt(position);
      const result = await updateLatestPriceModel({
        id,
        latestPrice: latestInfo[3],
        latestDate: new Date().valueOf(),
        profit,
        totalMoney,
      });
      if (result) {
        ctx.body = setResponseBody();
      } else {
        ctx.body = setResponseBody({}, '-1', '操作出错');
      }
    } else {
      ctx.body = setResponseBody({}, '-1', '获取最新价格出错');
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
  updateLatestPriceCtrl,
};
