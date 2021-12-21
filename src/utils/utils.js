/*
 * @Author: Vincent
 * @Date: 2021-12-21 14:48:11
 * @LastEditTime: 2021-12-21 14:48:12
 * @LastEditors: Vincent
 * @Description:
 */
// 接口参数格式化
export const Stringify = (data) => {
  const params = [];
  if (typeof data === 'object' && data instanceof Object) {
    Object.keys(data).forEach((item) => {
      params.push(`${item}=${data[item]}`);
    });
  }
  return params.length > 0 ? params.join('&') : '';
};
