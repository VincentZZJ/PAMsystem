/*
 * @Author: Vincent
 * @Date: 2022-04-11 10:17:23
 * @LastEditTime: 2022-04-11 14:12:05
 * @LastEditors: Vincent
 * @Description:
 */
import { useModel } from 'umi';

// 初始化websocket
export const initWebsocket = (path, userId) => {
  // debugger;
  // const { addMsgFun, clearMsgListFun } = useModel('useChatRoomModel', (model) => ({
  //   addMsgFun: model.addMsg,
  //   clearMsgListFun: model.clearMsgList,
  // }));

  // console.log(addMsgFun);

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
