/*
 * @Author: Vincent
 * @Date: 2021-12-21 13:19:45
 * @LastEditTime: 2021-12-21 16:41:56
 * @LastEditors: Vincent
 * @Description:
 */
import { request } from 'umi';
// import { Stringify } from '@/utils/utils';

export async function LoginService(data) {
  return request(`/pamsystem/usercenter/login`, {
    method: 'post',
    requestType: 'form',
    data,
  });
}
