import {application, Router} from 'express'
import { getUsers, getUserById, postUser, putUser, deleteUser } from '../controllers/user';
const router = Router()

router.get('/',getUsers)
router.get('/:id',getUserById)
router.post('/',postUser)
router.put('/:id',putUser)
router.delete('/:id',deleteUser)


export default router