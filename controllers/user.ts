import { Request, Response } from 'express'
import User from '../models/user'

export const getUsers = (req: Request, res: Response) => {
  res.json({ msg: 'Aca funciona' })
}
export const getUserById = (req: Request, res: Response) => {}
export const createAnUser = async (req: Request, res: Response) => {
  try {
    
    const user = User.build(req.body)
    await user.save()
    console.clear()
    return res.status(201).json({
      msg: 'Usuario creado',
      user,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        msg: 'Problema interno del servidor'
    })
  }
}
export const modifyAnUserById = (req: Request, res: Response) => {}
export const deleteAnUserById = (req: Request, res: Response) => {}
