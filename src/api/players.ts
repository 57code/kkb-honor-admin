import request from '@/utils/request'
import { Player } from './types'

export const defaultPlayerData: Player = {
  accountname: '',
  nickname: '',
  avatar: '',
  bravepoints: 0,
  exp: 0,
  id: 0,
  level: 0,
  rank: 0,
  wanttoplay: [],
  winningstreak: 0
}

export const getPlayers = (params: any) =>
  request({
    url: '/players',
    method: 'get',
    params
  })

export const getPlayer = (id: number) =>
  request({
    url: '/players/' + id.toString(),
    method: 'get'
  })

export const createPlayer = (data: any) =>
  request({
    url: '/players',
    method: 'post',
    data
  })

export const updatePlayer = (id: number, data: any) =>
  request({
    url: '/players' + id,
    method: 'put',
    data
  })

export const deletePlayer = (id: number) =>
  request({
    url: '/players/' + id.toString(),
    method: 'delete'
  })