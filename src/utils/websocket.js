/*
 * @Author: Vincent
 * @Date: 2022-04-11 10:17:23
 * @LastEditTime: 2022-05-14 16:01:01
 * @LastEditors: Vincent
 * @Description:
 */

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
      const data = JSON.parse(ev.data);
      const { msgPath, msgData } = data;
      if (msgPath === 'chatroommsg') {
        // addMsgFun(msgData);
        // increment();
        console.log(msgData);
      }
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
