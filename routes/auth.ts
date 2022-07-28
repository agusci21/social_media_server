import { Router } from 'express'
import { login, validateJWT } from '../controllers/auth'
const router = Router()
// api/auth
router.post('/login', login)
router.get('/:token', validateJWT)

export default router
