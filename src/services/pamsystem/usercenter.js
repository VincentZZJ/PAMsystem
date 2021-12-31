/*
 * @Author: Vincent
 * @Date: 2021-12-21 13:19:45
 * @LastEditTime: 2021-12-23 10:18:36
 * @LastEditors: Vincent
 * @Description:
 */
import { request } from 'umi';
import { Stringify } from '@/utils/utils';

// 登录接口
export async function LoginService(data) {
  return request(`/pamsystem/usercenter/login`, {
    method: 'post',
    requestType: 'form',
    data,
  });
}

// 注册接口
export async function RegisterService(data) {
  return request(`/pamsystem/usercenter/register`, {
    method: 'post',
    requestType: 'form',
    data,
  });
}

// 根据用户手机获取用户信息
export async function GetUserInfoByPhoneService(data) {
  return request(`/pamsystem/usercenter/getUserInfo?${Stringify(data)}`);
}
