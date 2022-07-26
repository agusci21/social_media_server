import { application, Router } from 'express'
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
router.post('/create', createAnUser)
router.put('/:id', modifyAnUserById)
router.delete('/:id', deleteAnUserById)

export default router
