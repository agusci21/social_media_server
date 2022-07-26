"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
const validate_fields_1 = require("../middlewares/validate_fields");
const router = (0, express_1.Router)();
router.get('/', user_1.getUsers);
router.get('/:id', user_1.getUserById);
router.post('/create', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    (0, express_validator_1.check)('email', 'El correo no es valido').isEmail(),
    validate_fields_1.validateFields
], user_1.createAnUser);
router.put('/:id', user_1.modifyAnUserById);
router.delete('/:id', user_1.deleteAnUserById);
exports.default = router;
