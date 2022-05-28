/*
 * @Author: Vincent
 * @Date: 2022-03-28 17:11:44
 * @LastEditTime: 2022-05-28 16:37:25
 * @LastEditors: Vincent
 * @Description:聊天室
 */
const {
  getRoomListModel,
  getUserListByRoomIdModel,
  searchFriendsModel,
  addFriendModel,
} = require('../models/chatRoomModel');
const { getUserInfoByUserId } = require('../models/userModel');
const fsPromise = require('fs').promises;
const path = require('path');
const { setResponseBody, getStaticsPath } = require('../utils/utils');
const UUID = require('node-uuid');
const Redis = require('koa-redis');

// 新建redis客户端
// const Store = new Redis().client;

/**
 * @description: 获取聊天记录文件路径
 * @param {*} phone
 * @return {*}
 */
const getMsgPath = async (phone) => {
  const pathUrl = await getStaticsPath(phone, 'msglog');
  return pathUrl;
};

/**
 * @description:
 * @param {*}
 * @return {*}
 */
const getRoomListCtrl = async (ctx) => {
  const { userId } = ctx.request.query;
  try {
    //   根据用户id查询用户-聊天室的关联表
    // const roomIds = await getUserListByRoomIdModel(userId);
    const roomList = await getRoomListModel(userId);
    ctx.body = setResponseBody(roomList);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description:根据手机号查询好友
 * @param {*} ctx
 * @return {*}
 */
const searchFriendsCtrl = async (ctx) => {
  const { phone } = ctx.request.query;
  try {
    const results = await searchFriendsModel({ phone });
    const rs = [];
    if (results && results.length > 0) {
      results.forEach((item) => {
        rs.push({
          id: item.id,
          userName: item.username,
          userImg: item.img || '#',
        });
      });
    }
    ctx.body = setResponseBody(rs);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 保存聊天信息到本地
 * @param {*} ctx
 * @return {*}
 */
const saveMsgToLocal = async (localPath, msgInfo) => {
  const { friendId, userId, addMsg, msgTime, roomId } = msgInfo;
  await fsPromise
    .access(`${localPath}/msg.json`)
    .then(async () => {
      await fsPromise.readFile(`${localPath}/msg.json`, 'utf-8').then(async (data) => {
        let jsonObj = {};
        if (data !== '') {
          jsonObj = JSON.parse(data);
        }
        if (!jsonObj[roomId]) {
          jsonObj[roomId] = [];
        }
        jsonObj[roomId].push({ time: msgTime, msg: addMsg, msgfrom: userId, msgto: friendId });
        await fsPromise.writeFile(`${localPath}/msg.json`, JSON.stringify(jsonObj), 'utf-8');
      });
    })
    .catch(async (err) => {
      console.log(err);
      const jsonObj = {};
      jsonObj[roomId] = [{ time: msgTime, msg: addMsg, msgfrom: userId, msgto: friendId }];
      await fsPromise.appendFile(`${localPath}/msg.json`, JSON.stringify(jsonObj), 'utf-8');
    });
};

/**
 * @description: 添加好友
 * @param {*} ctx
 * @return {*}
 */
const addFriendCtrl = async (ctx) => {
  const { friendId, userId, addMsg, msgTime } = ctx.request.body;
  if (userId && friendId) {
    try {
      const userInfo = await getUserInfoByUserId(userId);
      const friendInfo = await getUserInfoByUserId(friendId);
      const roomId = UUID.v1();
      const roomName = `${userInfo.username}&${friendInfo.username}`;
      const res = await addFriendModel({ friendId, userId, addMsg, msgTime, roomId, roomName });
      if (res) {
        if (userInfo.id && friendInfo.id) {
          const userPath = await getMsgPath(userInfo.phone);
          const friendPath = await getMsgPath(friendInfo.phone);
          await saveMsgToLocal(userPath, { friendId, userId, addMsg, msgTime, roomId });
          await saveMsgToLocal(friendPath, { friendId, userId, addMsg, msgTime, roomId });
        } else {
          console.log('记录保存失败');
        }
      }
      ctx.body = setResponseBody(res);
    } catch (e) {
      ctx.body = setResponseBody(e, '-1', '服务出错');
    }
  } else {
    ctx.body = setResponseBody({}, '-1', '接口缺少参数');
  }
};

/**
 * @description: 根据聊天室id获取聊天记录
 * @param {*} ctx
 * @return {*}
 */
const getMsgListByRoomIdCtrl = async (ctx) => {
  const { roomId, userId } = ctx.request.query;
  // const userId = ctx.cookies.get('userId');
  try {
    const userInfo = await getUserInfoByUserId(userId);
    let msgList = [];
    if (userInfo) {
      const msgpath = await getMsgPath(userInfo.phone);
      await fsPromise.access(msgpath).then(async () => {
        await fsPromise.readFile(`${msgpath}/msg.json`, 'utf-8').then((data) => {
          const jsonObj = JSON.parse(data);
          msgList = jsonObj[roomId] || [];
        });
      });
    }
    ctx.body = setResponseBody(msgList);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

/**
 * @description: 根据roomId获取好友列表
 * @param {*} ctx
 * @return {*}
 */
const getRoomUserListCtrl = async (ctx) => {
  const { roomId } = ctx.request.query;
  try {
    const userList = await getUserListByRoomIdModel(roomId);
    ctx.body = setResponseBody(userList);
  } catch (e) {
    ctx.body = setResponseBody(e, '-1', '服务出错');
  }
};

module.exports = {
  getRoomListCtrl,
  searchFriendsCtrl,
  addFriendCtrl,
  getMsgListByRoomIdCtrl,
  getMsgPath,
  saveMsgToLocal,
  getRoomUserListCtrl,
};
