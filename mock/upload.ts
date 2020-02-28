import {Request,Response} from 'express'
import faker from 'faker'

export function upload(req:Request, res: Response) {
    // 将上传文件重命名
    // 返回文件名
    res.json({
        code: 20000,
        data: {
            filename: faker.image.avatar()
        }
    })
}