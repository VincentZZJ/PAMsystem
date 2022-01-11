/*
 * @Author: Vincent
 * @Date: 2022-01-10 15:45:58
 * @LastEditTime: 2022-01-11 14:55:08
 * @LastEditors: Vincent
 * @Description:
 */
const Mysql = require('../config/mysql');
const UUID = require('node-uuid');
const InvestItem = Mysql.invest_item;
const InvestHistory = Mysql.invest_history;
const InvestRecord = Mysql.invest_record;

const addInvestItemModel = async (data) => {
  const isAdd = await InvestItem.create({
    id: UUID.v1(),
    ...data,
  });
  return isAdd && isAdd.dataValues;
};

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
  return result;
};

module.exports = {
  addInvestItemModel,
  getInvestListByOptionsModel,
};
