/*
 * @Author: Vincent
 * @Date: 2021-12-21 14:48:11
 * @LastEditTime: 2022-01-19 15:44:39
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

// 金额格式化
export const formatMoney = (money, n = 3) => {
  if (isNaN(parseFloat(money))) {
    return '00.00';
  }
  const isNegative = money < 0;
  let _money = Math.abs(money);
  const moneyInitArr = `${_money.toFixed(n)}`.split('.');
  const moneyBeforeDotArr = moneyInitArr[0].split('');
  const resultArr = [];
  for (let i = 0; i < moneyBeforeDotArr.length; i++) {
    resultArr.unshift(moneyBeforeDotArr[moneyBeforeDotArr.length - i - 1]);
    if (i + 1 < moneyBeforeDotArr.length && (i + 1) % 3 === 0) {
      resultArr.unshift(',');
    }
  }
  if (isNegative) {
    resultArr.unshift('-');
  }
  return resultArr.join('') + '.' + moneyInitArr[1];
};
