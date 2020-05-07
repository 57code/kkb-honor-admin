import request from '../utils/request';

export function getBanpick(params: any) {
  return request.get('/banpick', {
    params
  })
}

// 获取英雄办选数据详情
export function getBanpickDetail(id: string) {
  return request.get('/banpick/'+id)
}