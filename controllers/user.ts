import { Request, Response } from 'express'
import User from '../models/user'
import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator'
import { validateFields } from '../middlewares/validate_fields'
import { checkIfEmailExists } from '../helpers/check_if_email_exists'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch (error) {
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
    console.log(error)
    return res.status(500).json({
      msg: 'Error interno del servidor',
    })
  }
}
export const createAnUser = async (req: Request, res: Response) => {
  console.log('LLega aca')
  console.log(req.body)
  const existEmail = await checkIfEmailExists(req.body.email)
  if (existEmail)
    return res.status(400).json({
      msg: `El email ${req.body.email} ya esta en uso`,
    })
  try {
    const user = User.build(req.body)
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(req.body.password, salt)
    await user.save()
    const createdUser = await User.findOne({
      where: { email: req.body.email },
    })
    console.log(createAnUser)
    return res.status(201).json({
      msg: 'Usuario creado',
      createdUser,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Problema interno del servidor',
    })
  }
}
export const modifyAnUserById = (req: Request, res: Response) => {}
export const deleteAnUserById = (req: Request, res: Response) => {}
