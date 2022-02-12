/*
 * @Author: Vincent
 * @Date: 2022-01-10 15:45:22
 * @LastEditTime: 2022-02-10 19:51:55
 * @LastEditors: Vincent
 * @Description:
 */
const {
  addInvestItemModel,
  getInvestListByOptionsModel,
  deleteInvestItemByIdModel,
  addInvestRecordModel,
  updateLatestPriceModel,
  addMoneyFlowingModel,
  getUserCountInfoModel,
  getMoneyFlowingListModel,
  updateUserCountModel,
} = require('../models/investModel');
const Koa2Req = require('koa2-request');
const moment = require('moment');
const { setResponseBody, createFileFromUpload } = require('../utils/utils');
const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');

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
    const latestRes = await Koa2Req(
      `http://web.juhe.cn:8080/finance/stock/hs?key=65d5d901d21cff585ce9c01123da66a4&gid=${code}`,
    );
    if (latestRes.body) {
      const dataSource = JSON.parse(latestRes.body);
      if (dataSource.resultcode === '200') {
        const { data } = dataSource.result[0];
        const latestPrice = parseFloat(data.nowPri);
        const profit = (latestPrice - parseFloat(cost)) * parseInt(position);
        const totalMoney = latestPrice * parseInt(position);
        const result = await updateLatestPriceModel({
          id,
          latestPrice,
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
        ctx.body = setResponseBody(dataSource.reason, '-1', '第三方接口出错');
      }
    } else {
      ctx.body = setResponseBody({}, '-1', '获取最新价格出错');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 新增资金流水
 * @param {*} ctx
 * @return {*}
 */
const addMoneyFlowingCtrl = async (ctx) => {
  const { userId, money, moneyOpt, investType, createDate } = ctx.request.body;
  try {
    // 先查账户
    const userCountInfo = await getUserCountInfoModel({ userId });
    const { stockCount, fundCount } = userCountInfo;
    // 更新账户
    let restMoney = investType === '1' ? parseFloat(stockCount) : parseFloat(fundCount);
    if (moneyOpt === '1') {
      restMoney += parseFloat(money);
    } else {
      restMoney -= parseFloat(money);
    }
    if (investType === '1') {
      await updateUserCountModel({ userId, stockCount: restMoney });
    } else if (investType === '2') {
      await updateUserCountModel({ userId, fundCount: restMoney });
    }
    // 再插入记录
    const result = await addMoneyFlowingModel({
      userId,
      money,
      moneyOpt,
      investType,
      restMoney,
      createDate,
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
 * @description: 根据用户id获取账户信息
 * @param {*} ctx
 * @return {*}
 */
const getUserCountInfoCtrl = async (ctx) => {
  const { userId } = ctx.request.query;
  try {
    const result = await getUserCountInfoModel({ userId });
    ctx.body = setResponseBody(result);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 获取资金流水
 * @param {*} ctx
 * @return {*}
 */
const getMoneyFlowingListCtrl = async (ctx) => {
  const searchDict = ['userId', 'startDate', 'endDate', 'investType'];
  const { pageSize, currentPage, ...data } = ctx.request.query;
  const params = {};
  Object.keys(data).forEach((item) => {
    if (searchDict.includes(item) && data[item]) {
      params[item] = data[item];
    }
  });
  try {
    const result = await getMoneyFlowingListModel({
      params,
      pagination: { pageSize, currentPage },
    });
    if (result) {
      ctx.body = setResponseBody(result);
    } else {
      ctx.body = setResponseBody({}, '-1', '获取失败');
    }
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

// 测试上传文件
const uploadFileCtrl = async (ctx) => {
  console.log(__dirname);
  const { username } = ctx.request.body;
  const { file } = ctx.request;
  console.log(username);
  try {
    const newPath = path.join(__dirname, `../statics/${username}`);
    let isSave = false;
    await fsPromise
      .access(newPath)
      .then(async () => {
        isSave = true;
        await fsPromise.rename(file.path, `${newPath}/${file.filename}`);
      })
      .catch(async (err) => {
        await fsPromise.mkdir(newPath);
        isSave = true;
        await fsPromise.rename(file.path, `${newPath}/${file.filename}`);
      });
    // fs.access(newPath, async (err) => {
    //   if (err) {
    //     fsPromise.mkdir(newPath);
    //   }
    //   await fsPromise.rename(file.path, `${newPath}/${file.filename}`);
    //   // if (isSave) {
    //   // ctx.body = setResponseBody(newPath);
    //   isSave = true;
    //   // } else {
    //   //   ctx.body = setResponseBody({}, '-1', '上传失败');
    //   // }
    // });
    if (isSave) {
      ctx.body = setResponseBody(newPath);
    } else {
      ctx.body = setResponseBody({}, '-1', '上传失败');
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
  addMoneyFlowingCtrl,
  getUserCountInfoCtrl,
  getMoneyFlowingListCtrl,
  uploadFileCtrl,
};
