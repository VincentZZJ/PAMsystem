/*
 * @Author: Vincent
 * @Date: 2021-12-07 15:08:34
 * @LastEditTime: 2022-01-11 14:16:41
 * @LastEditors: Vincent
 * @Description:工具类
 */

const setResponseBody = (result, code = '0', desc = '操作成功') => {
  return {
    code,
    desc,
    msg: result,
  };
};

module.exports = {
  setResponseBody,
};
