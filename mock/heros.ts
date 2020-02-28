import { Request, Response } from "express";
import { Hero, BanPick, BanPickDetail } from "../src/api/types";
import faker from 'faker'

export const heros: Hero[] = [
    { id: 1, name: '百里玄策', icon: 'xc.jpg', classify: ['刺客'] },
    { id: 2, name: '孙悟空', icon: 'swc.jpg', classify: ['刺客'] },
    { id: 3, name: '鲁班七号', icon: 'lbqh.jpg', classify: ['射手'] },
    { id: 4, name: '后羿', icon: 'hy.jpg', classify: ['射手'] },
    { id: 5, name: '王昭君', icon: 'wzj.jpg', classify: ['法师'] },
    { id: 6, name: '貂蝉', icon: 'dc.jpg', classify: ['法师'] },
    { id: 7, name: '钟馗', icon: 'zk.jpg', classify: ['法师', '辅助'] },
    { id: 8, name: '牛魔', icon: 'nm.jpg', classify: ['坦克', '辅助'] },
    { id: 9, name: '亚瑟', icon: 'ys.jpg', classify: ['战士', '坦克'] },
    { id: 10, name: '吕布', icon: 'lb.jpg', classify: ['战士'] },
]

const banpick: BanPick[] = [
    { hero: heros[0], ban: 0.05, pick: 0.15 },
    { hero: heros[1], ban: 0.15, pick: 0.3 },
    { hero: heros[2], ban: 0.01, pick: 0.42 },
    { hero: heros[3], ban: 0.02, pick: 0.43 },
    { hero: heros[4], ban: 0.12, pick: 0.35 },
    { hero: heros[5], ban: 0.05, pick: 0.12 },
    { hero: heros[6], ban: 0.1, pick: 0.32 },
    { hero: heros[7], ban: 0.06, pick: 0.18 },
    { hero: heros[8], ban: 0.03, pick: 0.15 },
    { hero: heros[9], ban: 0.07, pick: 0.29 },
]
const banpickDetail: BanPickDetail[] = [
    {
        hero: heros[0], week: {
            ban: [0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05],
            pick: [0.15, 0.1, 0.11, 0.12, 0.09, 0.12, 0.11]
        }, month: {
            ban: [0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05, 0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05, 0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05, 0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05],
            pick: [0.15, 0.1, 0.11, 0.12, 0.09, 0.12, 0.11, 0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05, 0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05, 0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05]
        }, quarter: {
            ban: [0.05, 0.04, 0.03, 0.05],
            pick: [0.15, 0.1, 0.11, 0.12]
        }, year: {
            ban: [0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05, 0.03, 0.05, 0.06, 0.05, 0.05],
            pick: [0.15, 0.1, 0.11, 0.12, 0.09, 0.12, 0.11, 0.1, 0.11, 0.12, 0.09, 0.10]
        }
    }
]

export const getHeros = (req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query

    const pageList = heros.filter((_, index) => index < limit * page && index >= limit * (page - 1))
    console.log(pageList);

    return res.json({
        code: 20000,
        data: {
            total: heros.length,
            items: pageList
        }
    })
}

export const getHero = (req: Request, res: Response) => {
    const { id } = req.params
    for (const hero of heros) {
        if (hero.id.toString() === id) {
            return res.json({
                code: 20000,
                data: {
                    hero
                }
            })
        }
    }
    return res.json({
        code: 70001,
        message: 'hero not found'
    })
}

export const createHero = (req: Request, res: Response) => {
    const { hero } = req.body
    return res.json({
        code: 20000,
        data: {
            hero
        }
    })
}

export const updateHero = (req: Request, res: Response) => {
    const { id } = req.params
    const { hero } = req.body
    for (const v of heros) {
        if (v.id.toString() === id) {
            return res.json({
                code: 20000,
                data: {
                    hero
                }
            })
        }
    }
    return res.json({
        code: 70001,
        message: 'hero not found'
    })
}

export const deleteHero = (req: Request, res: Response) => {
    return res.json({
        code: 20000,
    })
}

export const getBanPickData = (req: Request, res: Response) => {
    return res.json({
        code: 20000,
        data: {
            banpick,
            total: banpick.length
        }
    })
}
export const getBanPickDetail = (req: Request, res: Response) => {
    const { id } = req.params
    const detail = banpickDetail.find(item => item.hero.id === +id)
    console.log(detail);

    return res.json({
        code: 20000,
        data: {
            detail
        }
    })
}