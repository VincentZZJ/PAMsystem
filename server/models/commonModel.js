/*
 * @Author: Vincent
 * @Date: 2022-08-30 15:41:13
 * @LastEditTime: 2022-10-09 16:43:09
 * @LastEditors: Vincent
 * @Description:
 */
const { Mysql } = require('../config/mysql');
// const UUID = require('node-uuid');
const T_File = Mysql.t_file;

/**
 * @description: 保存文件
 * @param {*} data
 * @return {*}
 */
const saveFileInfoModel = async (data) => {
  await T_File.create({
    id: data.id,
    filePath: data.filePath,
    fileName: data.fileName,
    fileType: data.fileType,
    serverUrl: data.serverUrl,
    uploader: data.uploader,
    createTime: new Date().valueOf(),
  });
};

/**
 * @description: 更新文件资源
 * @param {*} data
 * @return {*}
 */
const updateFileInfoModel = async (data) => {
  // 更新文件资源
  await T_File.update(
    {
      businessId: data.businessId,
    },
    {
      where: {
        id: data.id,
      },
    },
  );
};

/**
 * @description: 重置文件资源分配
 * @param {*} data
 * @return {*}
 */
const resetBusinessIdModel = async (data) => {
  await T_File.update(
    {
      businessId: '',
    },
    {
      where: {
        businessId: data.id,
      },
    },
  );
};

/**
 * @description: 根据资源id找出所有文件
 * @param {*} data
 * @return {*}
 */
const getFileListByBusinessId = async (data) => {
  const res = await T_File.findAll({
    where: {
      businessId: data.businessId,
    },
    attributes: { exclude: ['filePath'] },
  });
  return res;
};

module.exports = {
  saveFileInfoModel,
  updateFileInfoModel,
  getFileListByBusinessId,
  resetBusinessIdModel,
};
