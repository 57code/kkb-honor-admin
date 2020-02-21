import faker from 'faker'
import { Response, Request } from 'express'
import { Player, Hero } from '../src/api/types'

faker.locale = 'zh_CN'

// 模拟想用英雄
const heros: Hero[] = [
  {name: '百里玄策', icon: 'xc.jpg'},
  {name: '孙悟空', icon: 'swc.jpg'},
  {name: '鲁班七号', icon: 'lb.jpg'},
  {name: '后羿', icon: 'hy.jpg'},
  {name: '王昭君', icon: 'wzj.jpg'},
  {name: '貂蝉', icon: 'dc.jpg'},
  {name: '钟馗', icon: 'zk.jpg'},
  {name: '牛魔', icon: 'nm.jpg'},
  {name: '亚瑟', icon: 'ys.jpg'},
  {name: '吕布', icon: 'lb.jpg'},
]
// 只有三个不能重复
function genWantoplay() {
  let wanttoplay: Set<Hero> = new Set();
  while(wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)])
  }

  console.log(wanttoplay);
  return wanttoplay;
}


// 模拟用户数据
const playerCount = 100
const playerList: Player[] = []

for (let i = 1; i < playerCount; i++) {
  playerList.push({
    id: i,
    acountname: faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(10000),
    level: faker.random.number(30),
    nickname: faker.name.findName(),
    rank: faker.random.number(200),
    wanttoplay: Array.from(genWantoplay()),
    winningstreak: faker.random.number(10)
  })
}

export const getPlayers = (req: Request, res: Response) => {
  const { acountname, nickname, page = 1, limit = 20 } = req.query

  let mockList = playerList.filter(item => {
    if (acountname && item.acountname.indexOf(acountname) < 0) return false
    if (nickname && item.nickname.indexOf(nickname) < 0) return false
    return true
  })

  const pageList = mockList.filter((_, index) => index < limit * page && index >= limit * (page - 1))

  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'player not found'
  })
}

export const createPlayer = (req: Request, res: Response) => {
  const { player } = req.body
  return res.json({
    code: 20000,
    data: {
      player
    }
  })
}

export const updatePlayer = (req: Request, res: Response) => {
  const { id } = req.params
  const { player } = req.body
  for (const v of playerList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'player not found'
  })
}

export const deletePlayer = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
  })
}
