/*
 * @Author: Vincent
 * @Date: 2021-12-21 14:48:11
 * @LastEditTime: 2022-05-14 16:34:33
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

// 解析图片
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// 字符串长度截取
export const shortLongText = (text, len) => {
  if (text.length > len) {
    return text.substring(0, len) + '...';
  } else {
    return text;
  }
};

// 初始化websocket
export const initWebsocket = (path, userId) => {
  if (!window.wsServer) {
    window.wsServer = new WebSocket(`ws://${path}:3030/chatroom?userId=${userId}`);
    window.wsServer.onopen = (ev) => {
      console.log('ws连接开启', ev);
    };
    window.wsServer.onclose = (ev) => {
      console.log('ws断开连接', ev);
    };
    // 消息监听
    window.wsServer.onmessage = (ev) => {
      console.log(ev);
    };
  }
};

// 规范websocket发送模板
export const formatMsgModel = (path, data) => {
  const msgModel = {
    msgPath: path,
    msgData: data,
  };
  return msgModel;
};
