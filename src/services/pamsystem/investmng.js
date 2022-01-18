/*
 * @Author: Vincent
 * @Date: 2022-01-11 15:41:54
 * @LastEditTime: 2022-01-17 15:04:11
 * @LastEditors: Vincent
 * @Description:
 */

import { request } from 'umi';
import { Stringify } from '@/utils/utils';

// 新增投资项
export async function addInvestService(data) {
  return request(`/pamsystem/investmng/addInvest`, {
    method: 'post',
    requestType: 'form',
    data,
  });
}

// 根据条件获取投资列表
export async function getInvestListByOptService(data) {
  return request(`/pamsystem/investmng/getAllInvestByOpts?${Stringify(data)}`);
}

// 根据投资项的Id删除
export async function deleteInvestItemService(id) {
  return request(`/pamsystem/investmng/deleteInvestItemById?id=${id}`, {
    method: 'delete',
  });
}

// 更新投资信息
export async function updateInvestService(data) {
  return request(`/pamsystem/investmng/addInvestRecord`, {
    method: 'post',
    requestType: 'form',
    data,
  });
}

// 获取最新价格
export async function updatePriceByCodeService(data) {
  return request(`/pamsystem/investmng/getLatestPriceByCode?${Stringify(data)}`);
}
