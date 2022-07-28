import { Request, Response } from 'express'
import { checkIfEmailExists } from '../helpers/check_if_email_exists'
import bcryptjs from 'bcryptjs'
import User from '../models/user'
import { generateJWT } from '../helpers/generate_jwt'
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({
    where: { email },
  })

  if (!user)
    return res.status(404).json({
      msg: `El correo ${email} no existe`,
    })

  if (!bcryptjs.compareSync(password, user.password))
    return res.status(400).json({
      msg: 'La contraseña es incorrecta',
    })
  const token = await generateJWT(user.id)
  return res.json({
    user,
    token,
  })
}

export const validateJWT = (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const secretKey = process.env.SECRETORPRIVATEKEY ?? ''
    const isValidToken = jwt.verify(token, secretKey)
    isValidToken
      ? res.status(200).json({
          valid: true,
        })
      : res.status(400).json({
          valid: false,
          msg: 'Token expirado',
        })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: 'Formato incorrecto',
    })
  }
}
