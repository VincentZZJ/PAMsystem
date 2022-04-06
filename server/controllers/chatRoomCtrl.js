/*
 * @Author: Vincent
 * @Date: 2022-03-28 17:11:44
 * @LastEditTime: 2022-04-06 10:46:25
 * @LastEditors: Vincent
 * @Description:聊天室
 */
const {
  getRoomListModel,
  getUserListByRoomIdModel,
  searchFriendsModel,
  addFriendModel,
} = require('../models/chatRoomModel');
const { setResponseBody } = require('../utils/utils');

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
      const res = await addFriendModel({ friendId, userId, addMsg, msgTime });
      ctx.body = setResponseBody(res);
    } catch (e) {
      ctx.body = setResponseBody(e, '-1', '服务出错');
    }
  }
};

module.exports = {
  getRoomListCtrl,
  searchFriendsCtrl,
  addFriendCtrl,
};
