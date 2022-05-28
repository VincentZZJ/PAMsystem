/*
 * @Author: Vincent
 * @Date: 2022-03-26 14:44:15
 * @LastEditTime: 2022-05-28 14:32:23
 * @LastEditors: Vincent
 * @Description:
 */
import { request } from 'umi';
import { Stringify } from '@/utils/utils';

// 根据用户id获取用户聊天列表
export async function getChatRoomListService(id) {
  return request(`/pamsystem/chatroom/getRoomList?userId=${id}`);
}

// 根据聊天室id获取聊天室信息
export async function getChatRoomInfoService({ id, userId }) {
  return request(`/pamsystem/chatroom/getChatMsgList?roomId=${id}&userId=${userId}`);
}

// 添加好友
export async function addFriendsService(data) {
  return request(`/pamsystem/chatroom/addFriend`, {
    method: 'post',
    data,
  });
}

// 查询好友
export async function searchFriendsService(data) {
  return request(`/pamsystem/chatroom/searchFriend?${Stringify(data)}`);
}

// 根据聊天室id获取聊天室用户列表
export async function getRoomUserListByRoomIdService(roomId) {
  return request(`/pamsystem/chatroom/getRoomUserListByRoomId?roomId=${roomId}`);
}
