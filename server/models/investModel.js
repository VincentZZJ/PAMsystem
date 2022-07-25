/*
 * @Author: Vincent
 * @Date: 2022-01-10 15:45:58
 * @LastEditTime: 2022-07-23 15:42:11
 * @LastEditors: Vincent
 * @Description:
 */
const { Mysql, PamDatabase } = require('../config/mysql');
const UUID = require('node-uuid');
const sequelize = require('sequelize');
const InvestItem = Mysql.invest_item;
const InvestHistory = Mysql.invest_history;
const InvestRecord = Mysql.invest_record;
const InvestMoneyFlowing = Mysql.invest_moneyflowing;
const InvestUserCount = Mysql.invest_usercount;

/**
 * @description: 新增投资项
 * @param {*} data
 * @return {*}
 */
const addInvestItemModel = async (data) => {
  const { buyTime, buyPrice, position } = data;
  const itemId = UUID.v1();
  const isAdd = await InvestItem.create({
    id: itemId,
    ...data,
    status: 1,
    isDel: 0,
  });
  //   插入新的投资操作记录
  const recordId = UUID.v1();
  await InvestRecord.create({
    id: recordId,
    date: buyTime,
    investOpt: 0,
    investCost: buyPrice,
    investNum: position,
    latestCost: buyPrice,
  });
  //   插入记录成功后，更新关联表
  await InvestHistory.create({
    id: UUID.v1(),
    itemId: itemId,
    recordId: recordId,
  });
  return isAdd && isAdd.dataValues;
};

/**
 * @description: 根据条件获取投资项
 * @param {*} data
 * @return {*}
 */
const getInvestListByOptionsModel = async (data) => {
  const { params, pagination } = data;
  const currentPage = parseInt(pagination.currentPage);
  const pageSize = parseInt(pagination.pageSize);
  const result = await InvestItem.findAndCountAll({
    where: {
      ...params,
      isDel: 0,
    },
    order: [
      ['status', 'DESC'],
      ['buyTime', 'DESC'],
    ],
    raw: true,
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
  });
  if (result && result.rows.length > 0) {
    const itemIds = [];
    let cumulativeStockProfit = 0; // 股票累计盈亏
    let cumulativeFundProfit = 0; // 基金累计盈亏
    let allMoney = 0; // 在投项目的市值
    result.rows.forEach((item) => itemIds.push(`'${item.id}'`));
    const recordList = await PamDatabase.query(
      `select * from invest_record as a INNER join invest_history as b ON a.id = b.recordId where b.itemId in (${itemIds.toString()})`,
    );
    const userCountInfo = await InvestUserCount.findOne({
      where: {
        userId: params.userid,
      },
    });
    if (recordList && recordList.length > 0) {
      result.rows.forEach((item) => {
        // cumulativeProfit += parseFloat(item.profit);
        if (item.investType === '1') {
          cumulativeStockProfit += parseFloat(item.profit);
        } else if (item.investType === '2') {
          cumulativeFundProfit += parseFloat(item.profit);
        }
        if (item.status) {
          allMoney += parseFloat(item.totalMoney);
        }
        const optRecords = [];
        recordList[0].forEach((a) => {
          if (a.itemId === item.id) {
            optRecords.push(a);
          }
        });
        item.optHistory = optRecords;
      });
    }
    result.statObj = {
      allMoney,
      cumulativeFundProfit,
      cumulativeStockProfit,
      investStockMoney: parseFloat(userCountInfo.stockCount),
      investFundMoney: parseFloat(userCountInfo.fundCount),
    };
  }
  return result;
};

/**
 * @description: 根据项目id删除投资项
 * @param {*} id
 * @return {*}
 */
const deleteInvestItemByIdModel = async (id) => {
  const result = await InvestItem.update(
    {
      isDel: 1,
    },
    {
      where: {
        id: id,
      },
    },
  );
  return result;
};

/**
 * @description: 更新投资项数据
 * @param {*} data
 * @return {*}
 */
const addInvestRecordModel = async (data) => {
  const {
    id,
    date,
    investOpt,
    investCost,
    investNum,
    latestCost,
    profit,
    position,
    totalInvest,
    bouns,
  } = data;
  let isDone = false;
  //   插入新的投资操作记录
  const recordId = UUID.v1();
  const isAdd = await InvestRecord.create({
    id: recordId,
    date,
    investOpt,
    investCost,
    investNum,
    latestCost,
    bouns,
  });
  if (isAdd) {
    //   插入记录成功后，更新关联表
    await InvestHistory.create({
      id: UUID.v1(),
      itemId: id,
      recordId: recordId,
    });
    // 更新投资项的数据
    const otherOpt = {};
    if (totalInvest === '0') {
      otherOpt.status = 0;
      otherOpt.sellTime = date;
      otherOpt.sellPrice = investCost;
    }
    await InvestItem.update(
      {
        totalInvest,
        profit,
        cost: latestCost,
        position,
        ...otherOpt,
      },
      {
        where: {
          id: id,
        },
      },
    );
    isDone = true;
  }
  return isDone;
};

/**
 * @description: 更新最新价格
 * @param {*} data
 * @return {*}
 */
const updateLatestPriceModel = async (data) => {
  const { id, latestPrice, latestDate, profit, totalMoney } = data;
  const isUpdate = await InvestItem.update(
    {
      latestPrice,
      latestDate,
      profit,
      totalMoney,
    },
    {
      where: {
        id: id,
      },
    },
  );
  return isUpdate;
};

/**
 * @description: 新增银证流水
 * @param {*} data
 * @return {*}
 */
const addMoneyFlowingModel = async (data) => {
  const isAdd = await InvestMoneyFlowing.create({
    id: UUID.v1(),
    ...data,
  });
  return isAdd;
};

/**
 * @description: 获取用户资金账号
 * @param {*} data
 * @return {*}
 */
const getUserCountInfoModel = async (data) => {
  const { userId } = data;
  const countInfo = await InvestUserCount.findOne({
    where: {
      userId,
    },
  });
  let result = countInfo;
  if (!result) {
    // 若没有，则新建,后续应该先判断userId是否有效再创建
    result = await InvestUserCount.create({
      id: UUID.v1(),
      userId,
      stockCount: 0,
      fundCount: 0,
    });
  }
  return result;
};

/**
 * @description: 获取用户银证流水清单
 * @param {*} data
 * @return {*}
 */
const getMoneyFlowingListModel = async (data) => {
  const { params, pagination } = data;
  const pageSize = parseInt(pagination.pageSize);
  const currentPage = parseInt(pagination.currentPage);
  const { startDate, endDate, userId, ...otherOpts } = params;
  const searchOpt = {
    userId,
    ...otherOpts,
  };
  if (startDate && endDate) {
    searchOpt.createDate = {
      [sequelize.Op.between]: [startDate, endDate],
    };
  }
  const result = await InvestMoneyFlowing.findAndCountAll({
    where: {
      ...searchOpt,
    },
    order: [
      ['createDate', 'DESC'],
      ['investType', 'DESC'],
    ],
    raw: true,
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
  });
  return result;
};

/**
 * @description: 更新用户账号
 * @param {*} data
 * @return {*}
 */
const updateUserCountModel = async (data) => {
  const { userId, ...params } = data;
  const isUpdate = await InvestUserCount.update(
    {
      ...params,
    },
    {
      where: {
        userId: userId,
      },
    },
  );
  return isUpdate;
};

module.exports = {
  addInvestItemModel,
  getInvestListByOptionsModel,
  deleteInvestItemByIdModel,
  addInvestRecordModel,
  updateLatestPriceModel,
  addMoneyFlowingModel,
  getUserCountInfoModel,
  getMoneyFlowingListModel,
  updateUserCountModel,
};
