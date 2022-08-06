"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publication_1 = require("../controllers/publication");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const router = (0, express_1.Router)();
// TODO Implementar middlewares
router.post('/create', [
    (0, express_validator_1.check)('ownerId', 'El id del propietario es obligatorio').notEmpty(),
    (0, express_validator_1.check)('photoUrl', 'El Path de la foto es obligatorio').notEmpty(),
    (0, express_validator_1.check)('id', 'No debe enviar el id').isEmpty(),
    validate_fields_1.validateFields
], publication_1.createAPublication);
router.get('/', publication_1.getAllPublications);
exports.default = router;
