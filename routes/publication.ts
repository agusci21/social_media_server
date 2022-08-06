import {Router}   from "express";
import { createAPublication, getAllPublications } from '../controllers/publication';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate_fields';

const router = Router()
// TODO Implementar middlewares

router.post('/create',[
    check('ownerId', 'El id del propietario es obligatorio').notEmpty(),
    check('photoUrl', 'El Path de la foto es obligatorio').notEmpty(),
    check('id', 'No debe enviar el id').isEmpty(),
    validateFields
],createAPublication)

router.get('/', getAllPublications)

export default router