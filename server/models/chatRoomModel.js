/*
 * @Author: Vincent
 * @Date: 2022-03-28 17:18:03
 * @LastEditTime: 2022-04-07 15:50:11
 * @LastEditors: Vincent
 * @Description:
 */
const { Mysql, PamDatabase } = require('../config/mysql');
const UUID = require('node-uuid');
const ChatRoom = Mysql.chat_room;
const UserAndRoom = Mysql.user_and_room;
const User = Mysql.sys_user;

/**
 * @description: 根据用户id查询聊天室列表
 * @param {*} userId
 * @return {*}
 */
const getRoomListModel = async (userId) => {
  if (userId) {
    const results = await PamDatabase.query(
      `select * from chat_room where id in (select roomId from user_and_room where userId = '${userId}')`,
    );
    return results.length > 0 ? results[0] : [];
  }
};

/**
 * @description: 根据roomId 获取用户ids
 * @param {*} roomId
 * @return {*}
 */
const getUserListByRoomIdModel = async (roomId) => {
  if (roomId) {
    const userIds = await UserAndRoom.findAll({
      attributes: ['userId'],
      where: {
        roomId,
      },
    });
    return userIds;
  }
};

/**
 * @description: 查找好友
 * @param {*} phone
 * @return {*}
 */
const searchFriendsModel = async ({ phone }) => {
  if (phone) {
    const results = await User.findAll({
      where: {
        phone,
      },
    });
    return results;
  }
};

const addFriendModel = async ({ friendId, userId, addMsg, msgTime, roomId }) => {
  await UserAndRoom.create({
    id: UUID.v1(),
    userId,
    roomId,
  });
  await UserAndRoom.create({
    id: UUID.v1(),
    userId: friendId,
    roomId,
  });
  await ChatRoom.create({
    id: roomId,
    roomName: '测试',
    latestMsg: addMsg,
    latestMsgTime: msgTime,
  });
  return true;
};

module.exports = {
  getRoomListModel,
  getUserListByRoomIdModel,
  searchFriendsModel,
  addFriendModel,
};
