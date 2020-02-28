import request from '@/utils/request'
import { Hero, Result, BanPickDetail } from './types'

export const defaultHeroData: Hero = {
  id: 0,
  name: '',
  icon: '',
  classify: [],
}

export const getHeros = (params: any) =>
  request({
    url: '/heros',
    method: 'get',
    params
  })

export const getHero = (id: number, params: any) =>
  request({
    url: `/heros/${id}`,
    method: 'get',
    params
  })

export const createHero = (data: any) =>
  request({
    url: '/heros',
    method: 'post',
    data
  })

export const updateHero = (id: number, data: any) =>
  request({
    url: `/heros/${id}`,
    method: 'put',
    data
  })

export const deleteHero = (id: number) =>
  request({
    url: `/heros/${id}`,
    method: 'delete'
  })

export const getBanpick = (params: any) =>
  request({
    url: '/banpick',
    method: 'get',
    params
  })

export const getBanpickDetail = (id: string) =>
  request(`/banpick/${id}`)