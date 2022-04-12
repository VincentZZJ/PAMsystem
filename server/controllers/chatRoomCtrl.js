/*
 * @Author: Vincent
 * @Date: 2022-03-28 17:11:44
 * @LastEditTime: 2022-04-07 17:32:04
 * @LastEditors: Vincent
 * @Description:聊天室
 */
const {
  getRoomListModel,
  getUserListByRoomIdModel,
  searchFriendsModel,
  addFriendModel,
} = require('../models/chatRoomModel');
const fsPromise = require('fs').promises;
const path = require('path');
const { setResponseBody } = require('../utils/utils');
const UUID = require('node-uuid');
const Redis = require('koa-redis');

// 新建redis客户端
const Store = new Redis().client;

/**
 * @description: 获取聊天记录文件路径
 * @param {*} phone
 * @return {*}
 */
const getMsgPath = (phone) => {
  return path.join(__dirname, `../statics/databackup/pamid_${phone}/msglog`);
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
    const roomIds = await getRoomListModel(userId);
    ctx.body = setResponseBody(roomIds);
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
 * @description: 添加好友
 * @param {*} ctx
 * @return {*}
 */
const addFriendCtrl = async (ctx) => {
  const { friendId, userId, addMsg, msgTime } = ctx.request.body;
  if (userId && friendId) {
    try {
      const roomId = UUID.v1();
      const res = await addFriendModel({ friendId, userId, addMsg, msgTime, roomId });
      if (res) {
        const userInfo = await Store.get(userId);
        if (userInfo) {
          const msgpath = getMsgPath(JSON.parse(userInfo).phone);
          await fsPromise
            .access(`${msgpath}/msg.json`)
            .then(async () => {
              await fsPromise.readFile(`${msgpath}/msg.json`, 'utf-8').then(async (data) => {
                const jsonObj = JSON.parse(data);
                jsonObj[roomId] = [
                  { time: msgTime, msg: addMsg, msgfrom: userId, msgto: friendId },
                ];
                await fsPromise.writeFile(`${msgpath}/msg.json`, JSON.stringify(jsonObj), 'utf-8');
              });
            })
            .catch(async (err) => {
              console.log(err);
              await fsPromise.mkdir(msgpath);
              const jsonObj = {};
              jsonObj[roomId] = [{ time: msgTime, msg: addMsg, msgfrom: userId, msgto: friendId }];
              await fsPromise.appendFile(`${msgpath}/msg.json`, JSON.stringify(jsonObj), 'utf-8');
              // await fsPromise.readFile(msgpath, 'utf-8').then(async (data) => {
              //   const jsonObj = JSON.parse(data);
              //   jsonObj[roomId] = [
              //     { time: msgTime, msg: addMsg, msgfrom: userId, msgto: friendId },
              //   ];
              //   await fsPromise.writeFile(msgpath, JSON.stringify(jsonObj), 'utf-8');
              // });
            });
        }
      }
      ctx.body = setResponseBody(res);
    } catch (e) {
      ctx.body = setResponseBody(e, '-1', '服务出错');
    }
  }
};

/**
 * @description: 根据聊天室id获取聊天记录
 * @param {*} ctx
 * @return {*}
 */
const getMsgListByRoomIdCtrl = async (ctx) => {
  const { roomId } = ctx.request.query;
  const userId = ctx.cookies.get('userId');
  try {
    const userInfo = await Store.get(userId);
    let msgList = [];
    if (userInfo) {
      const msgpath = getMsgPath(JSON.parse(userInfo).phone);
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

module.exports = {
  getRoomListCtrl,
  searchFriendsCtrl,
  addFriendCtrl,
  getMsgListByRoomIdCtrl,
};
