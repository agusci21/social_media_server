import { application, Router } from 'express'
import { check } from 'express-validator'
import {
  getUsers,
  getUserById,
  createAnUser,
  modifyAnUserById,
  deleteAnUserById,
} from '../controllers/user'
const router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/create',[
  check('email', 'El correo no es valido').isEmail(),
],createAnUser)
router.put('/:id', modifyAnUserById)
router.delete('/:id', deleteAnUserById)

export default router
