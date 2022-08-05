import { Request, Response } from "express"

export const createAPublication = (req: Request, res: Response) => {
     return res.json({
        msg: 'Llega aca'
    })
}