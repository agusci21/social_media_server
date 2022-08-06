import { Request, Response } from 'express'
import Publication from '../models/publication'

export const createAPublication = async (req: Request, res: Response) => {
  try {
    const publication = Publication.build(req.body)
    await publication.save()
    return res.json({
      msg: 'Publicacion guardada',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Ocurrio un error en el servidor',
    })
  }
}

export const getAllPublications = async (req: Request, res: Response) => {
  const limit = Number.parseInt((req.query.limit ?? '20') as string)
  try {
    const publications = await Publication.findAll({
        limit,
        order: [['createdAt', 'DESC']]
    })

    return res.json({
      publications,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Ocurrio un error en el servidor',
    })
  }
}
