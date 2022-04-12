/*
 * @Author: Vincent
 * @Date: 2022-04-11 10:00:57
 * @LastEditTime: 2022-04-11 10:06:41
 * @LastEditors: Vincent
 * @Description: 聊天室model
 */

import { useCallback, useState } from 'react';

export const useChatRoomModel = () => {
  // 消息队列，ws推送过来的消息缓存
  const [msgList, setMsgList] = useState([]);

  //   更新消息
  const addMsg = useCallback((msgItem) => {
    setMsgList([...msgList, msgItem]);
  }, []);

  //   清空消息队列
  const clearMsgList = useCallback(() => {
    setMsgList([]);
  }, []);

  return {
    msgList,
    addMsg,
    clearMsgList,
  };
};
