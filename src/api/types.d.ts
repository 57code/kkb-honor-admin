export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}

// 英雄数据结构
export interface Hero {
  id: number,
  name: string, // 英雄名称
  icon: string, // 英雄头像图标
  classify: string[] // 英雄分类
}

// 玩家
export interface Player {
  id: number,
  accountname: string, // 账号名
  nickname: string, // 昵称
  avatar: string, // 用户头像
  level: number,// 用户等级
  exp: number,// 经验值
  rank: number, // 段位
  bravepoints: number, // 勇者积分
  winningstreak: number, // 连胜场次
  wanttoplay: Hero[] // 想玩英雄
}

// 办选数据类型
export interface BanPick {
  hero: Hero,
  ban: number,
  pick: number
}

// Bp
export interface Bp {
  ban: number[],
  pick: number[]
}

// 区间类型
export type RangeType = 'week' | 'month' | 'quarter' | 'year'

// 办选详情类型
export type BanPickDetail = {
  [key in RangeType]: Bp
}

// 带英雄数据详情
export type BanPickDetailAndHero = { hero: Hero } & BanPickDetail