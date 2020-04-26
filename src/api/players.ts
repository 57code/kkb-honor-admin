import request from '@/utils/request'

export const getPlayers = (params: any) =>
  request({
    url: '/players',
    method: 'get',
    params
  })