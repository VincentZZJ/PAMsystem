/*
 * @Author: Vincent
 * @Date: 2021-12-07 15:08:34
 * @LastEditTime: 2022-02-10 15:57:10
 * @LastEditors: Vincent
 * @Description:工具类
 */
const fs = require('fs').promises;

/**
 * @description: 设置响应头部
 * @param {*} result
 * @param {*} code
 * @param {*} desc
 * @return {*}
 */
const setResponseBody = (result, code = '0', desc = '操作成功') => {
  return {
    code,
    desc,
    msg: result,
  };
};

/**
 * @description: 操作本地文件(创建)
 * @param {*} path
 * @param {*} files
 * @return {*}
 */
const createFileFromUpload = async (path, files) => {
  try {
    await fs.appendFile(path, files);
    return true;
  } catch (err) {
    console.log('-----操作文件失败-----');
    console.error(err);
  }
};

module.exports = {
  setResponseBody,
  createFileFromUpload,
};
