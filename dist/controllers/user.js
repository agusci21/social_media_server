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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnUserById = exports.modifyAnUserById = exports.createAnUser = exports.getUserById = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => {
    res.json({ msg: 'Aca funciona' });
};
exports.getUsers = getUsers;
const getUserById = (req, res) => { };
exports.getUserById = getUserById;
const createAnUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = user_1.default.build(req.body);
        yield user.save();
        console.clear();
        return res.status(201).json({
            msg: 'Usuario creado',
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Problema interno del servidor'
        });
    }
});
exports.createAnUser = createAnUser;
const modifyAnUserById = (req, res) => { };
exports.modifyAnUserById = modifyAnUserById;
const deleteAnUserById = (req, res) => { };
exports.deleteAnUserById = deleteAnUserById;
