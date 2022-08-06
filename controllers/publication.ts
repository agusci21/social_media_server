import { Request, Response } from "express"
import Publication from "../models/publication"

export const createAPublication = async (req: Request, res: Response) => {
    try {
        const publication = Publication.build(req.body)
        
        await publication.save()
         return res.json({
            msg: 'Publicacion guardada'
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un error en el servidor'
        })
    }
}