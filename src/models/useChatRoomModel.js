/*
 * @Author: Vincent
 * @Date: 2022-04-11 10:00:57
 * @LastEditTime: 2022-05-28 16:29:33
 * @LastEditors: Vincent
 * @Description: 聊天室model
 */

import { useCallback, useState } from 'react';
import _ from 'lodash';

export default () => {
  // 消息队列，ws推送过来的消息缓存
  const [msgList, setMsgList] = useState([]);

  //   更新消息
  const addMsg = useCallback(
    (msgItem) => {
      // const msgs = _.cloneDeep(msgList);
      // const msgs = msgList.slice();
      // msgs.push(msgItem);
      setMsgList((msgs) => msgs.concat([msgItem]));
      // setMsgList(msgs);
      // const c = code + 1;
      // setCode(c);
      // console.log(msgItem);
    },
    [msgList],
  );

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
