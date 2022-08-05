import { Router, Request , Response}   from "express";
import { createAPublication } from '../controllers/publication';

const router = Router()
// TODO Implementar middlewares

router.post('/create', createAPublication)

export default router