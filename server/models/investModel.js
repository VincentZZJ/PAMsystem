/*
 * @Author: Vincent
 * @Date: 2022-01-10 15:45:58
 * @LastEditTime: 2022-01-19 16:31:58
 * @LastEditors: Vincent
 * @Description:
 */
const { Mysql, PamDatabase } = require('../config/mysql');
const UUID = require('node-uuid');
const sequelize = require('sequelize');
const InvestItem = Mysql.invest_item;
const InvestHistory = Mysql.invest_history;
const InvestRecord = Mysql.invest_record;

/**
 * @description: 新增投资项
 * @param {*} data
 * @return {*}
 */
const addInvestItemModel = async (data) => {
  const isAdd = await InvestItem.create({
    id: UUID.v1(),
    ...data,
    status: 1,
    isDel: 0,
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
    let cumulativeProfit = 0; // 累计盈亏
    let allInvest = 0; // 在投项目的总投资
    result.rows.forEach((item) => itemIds.push(`'${item.id}'`));
    const recordList = await PamDatabase.query(
      `select * from invest_record as a INNER join invest_history as b ON a.id = b.recordId where b.itemId in (${itemIds.toString()})`,
    );
    if (recordList && recordList.length > 0) {
      result.rows.forEach((item) => {
        cumulativeProfit += parseFloat(item.profit);
        if (item.status) {
          allInvest += parseFloat(item.totalInvest);
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
      cumulativeProfit,
      allInvest,
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
    totalMoney,
    profit,
    position,
    totalInvest,
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
        totalMoney,
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

module.exports = {
  addInvestItemModel,
  getInvestListByOptionsModel,
  deleteInvestItemByIdModel,
  addInvestRecordModel,
  updateLatestPriceModel,
};
