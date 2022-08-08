import { Request, Response } from 'express'
import Publication from '../models/publication'
import User from '../models/user';

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
    const rawPublications = await Publication.findAll({
        limit,
        order: [['createdAt', 'DESC']]
    })

    const owners = await getListOfUserByPublications(rawPublications.map(e => e.ownerId))
    let publications : any[] = []

    for(let i = 0; i < limit; i++){
      let {ownerId, ...publication} : any = rawPublications[i].toJSON()
      publication.owner = owners[i]
      publications[i] = publication
    }

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

const getListOfUserByPublications = async (listOfOwnersId : number[]) : Promise<User[]> => {
  let users : any[] = []
  console.log(listOfOwnersId.length)
  for(let i = 0; i < listOfOwnersId.length; i++){
    const user : any = await User.findByPk(listOfOwnersId[i])
    users[i] = user['dataValues']
  }
  console.table(users)
  return users
}