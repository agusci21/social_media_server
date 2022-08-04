"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnUserById = exports.modifyAnUserById = exports.createAnUser = exports.getUserById = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const check_if_email_exists_1 = require("../helpers/check_if_email_exists");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        return res.json(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(req.params.id);
        if (!user)
            return res.status(404).json({
                msg: `El usuario con id ${req.params.id} no existe`,
            });
        return res.json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
});
exports.getUserById = getUserById;
const createAnUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const existEmail = yield (0, check_if_email_exists_1.checkIfEmailExists)(req.body.email);
    if (existEmail)
        return res.status(400).json({
            msg: `El email ${req.body.email} ya esta en uso`,
        });
    try {
        const user = user_1.default.build(req.body);
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(req.body.password, salt);
        yield user.save();
        const createdUser = yield user_1.default.findOne({
            where: { email: req.body.email },
        });
        console.log(exports.createAnUser);
        return res.status(201).json({
            msg: 'Usuario creado',
            createdUser,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Problema interno del servidor',
        });
    }
});
exports.createAnUser = createAnUser;
const modifyAnUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { password, id } = body, rest = __rest(body, ["password", "id"]);
    console.log(rest);
    const { email, alias } = rest;
    const oldUser = yield user_1.default.findByPk(id);
    if (!oldUser)
        return res.status(404).json({
            msg: 'Usuario no encontrado',
        });
    const existEmail = yield (0, check_if_email_exists_1.checkIfEmailExists)(email);
    if (existEmail && email != oldUser.email)
        return res.status(400).json({
            msg: `El email: ${email} ya esta en uso`,
        });
    oldUser.update(body);
    const newUser = yield user_1.default.findByPk(id);
    return res.json({
        old: newUser,
        new: oldUser,
    });
});
exports.modifyAnUserById = modifyAnUserById;
const deleteAnUserById = (req, res) => { };
exports.deleteAnUserById = deleteAnUserById;
