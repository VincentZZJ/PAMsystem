/*
 * @Author: Vincent
 * @Date: 2022-05-14 16:18:56
 * @LastEditTime: 2022-05-14 16:44:05
 * @LastEditors: Vincent
 * @Description:
 */
import { useCallback, useState } from 'react';
import { useModel } from 'umi';

export default () => {
  const [wsServer, setWsServer] = useState({});
  const { initialState } = useModel('@@initialState');
  const { addMsg } = useModel('useChatRoomModel', (model) => ({ addMsg: model.addMsg }));

  // 取消ws服务
  const cancelWsServer = () => {
    if (wsServer) {
      wsServer.close();
      setWsServer({});
    }
  };

  //   创建ws服务
  const createWsServer = useCallback(() => {
    if (initialState?.currentUser) {
      const userId = initialState.currentUser.userId;
      const ws = new WebSocket(`ws://${window.location.hostname}:3030/chatroom?userId=${userId}`);
      ws.onopen = (ev) => {
        console.log('ws连接开启', ev);
      };
      ws.onclose = (ev) => {
        console.log('ws断开连接', ev);
      };
      //   消息监听
      ws.onmessage = (ev) => {
        const data = JSON.parse(ev.data);
        const { msgPath, msgData } = data;
        if (msgPath === 'chatroommsg') {
          // addMsgFun(msgData);
          addMsg(msgData);
          // increment();
          console.log(msgData);
        }
      };
      setWsServer(ws);
    }
  }, [initialState]);

  return {
    wsServer,
    cancelWsServer,
    createWsServer,
  };
};
