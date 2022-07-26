import { Request, Response } from 'express'
import User from '../models/user'
import bcryptjs from 'bcryptjs'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch (error) {
    console.clear()
    console.log(error)
    return res.status(500).json({
      msg: 'Error interno del servidor',
    })
  }
}
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user)
      return res.status(404).json({
        msg: `El usuario con id ${req.params.id} no existe`,
      })
    return res.json(user)
  } catch (error) {
    console.clear()
    console.log(error)
    return res.status(500).json({
      msg: 'Error interno del servidor',
    })
  }
}
export const createAnUser = async (req: Request, res: Response) => {
  try {
    const user = User.build(req.body)
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(req.body.password, salt)
    await user.save()
    const createdUser = await User.findOne({
      where: { email: req.body.email },
    })
    console.clear()
    return res.status(201).json({
      msg: 'Usuario creado',
      createdUser,
    })
  } catch (error) {
    console.clear()
    console.log(error)
    return res.status(500).json({
      msg: 'Problema interno del servidor',
    })
  }
}
export const modifyAnUserById = (req: Request, res: Response) => {}
export const deleteAnUserById = (req: Request, res: Response) => {}
