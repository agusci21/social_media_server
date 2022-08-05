"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publication_1 = require("../controllers/publication");
const router = (0, express_1.Router)();
// TODO Implementar middlewares
router.post('/create', publication_1.createAPublication);
exports.default = router;
