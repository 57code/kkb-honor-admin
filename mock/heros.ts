// 英雄相关接口编写的地方

import { Hero } from "../src/api/types";

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