/*
 * @Author: Vincent
 * @Date: 2022-01-10 15:45:58
 * @LastEditTime: 2022-01-14 15:05:59
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
    },
    raw: true,
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
  });
  // let
  if (result && result.rows.length > 0) {
    const itemIds = [];
    result.rows.forEach((item) => itemIds.push(`'${item.id}'`));
    const recordList = await PamDatabase.query(
      `select * from invest_record as a INNER join invest_history as b ON a.id = b.recordId where b.itemId in (${itemIds.toString()})`,
    );
    if (recordList && recordList.length > 0) {
      result.rows.forEach((item) => {
        const optRecords = [];
        recordList[0].forEach((a) => {
          if (a.itemId === item.id) {
            optRecords.push(a);
          }
        });
        item.optHistory = optRecords;
      });
    }
  }
  return result;
};

/**
 * @description: 根据项目id删除投资项
 * @param {*} id
 * @return {*}
 */
const deleteInvestItemByIdModel = async (id) => {
  const result = await InvestItem.destroy({
    where: {
      id: id,
    },
  });
  return result;
};

/**
 * @description: 更新投资项数据
 * @param {*} data
 * @return {*}
 */
const addInvestRecordModel = async (data) => {
  const { id, date, investOpt, investCost, investNum, latestCost, totalMoney, profit, buyNum } =
    data;
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
    await InvestItem.update(
      {
        totalMoney,
        profit,
        buyCost: latestCost,
        buyNum: buyNum,
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

module.exports = {
  addInvestItemModel,
  getInvestListByOptionsModel,
  deleteInvestItemByIdModel,
  addInvestRecordModel,
};
