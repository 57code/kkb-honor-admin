import { Response, Request } from 'express'

export const getTestData = (req: Request, res: Response) => {
    return res.json({
        code: 20000,
        data: {
            items: [1, 2, 3]
        }
    })
}