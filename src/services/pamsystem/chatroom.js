/*
 * @Author: Vincent
 * @Date: 2022-03-26 14:44:15
 * @LastEditTime: 2022-04-06 10:31:56
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
export async function getChatRoomInfoService(id) {
  return request(`/pamsystem/chatroom/getChatUserList?roomId=${id}`);
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
