/*
 * @Author: Vincent
 * @Date: 2022-02-11 19:55:16
 * @LastEditTime: 2022-02-12 15:40:32
 * @LastEditors: Vincent
 * @Description:
 */
import { request } from 'umi';
import { Stringify } from '@/utils/utils';

// 根据条件获取该日的日记及附件信息
export async function getDiaryByOptionsService(data) {
  return request(`/pamsystem/diarymng/getDiaryByOptions?${Stringify(data)}`);
}

// 根据id删除日记
export async function deleteDiaryByIdService(id) {
  return request(`/pamsystem/diarymng/deleteDiaryById?id=${id}`, {
    method: 'delete',
  });
}

// 保存日记
export async function saveDiaryInfoService(data) {
  return request(`/pamsystem/diarymng/saveDiaryInfo`, {
    method: 'post',
    data,
  });
}
