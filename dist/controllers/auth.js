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
exports.validateJWT = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const generate_jwt_1 = require("../helpers/generate_jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({
        where: { email },
    });
    if (!user)
        return res.status(404).json({
            msg: `El correo ${email} no existe`,
        });
    if (!bcryptjs_1.default.compareSync(password, user.password))
        return res.status(400).json({
            msg: 'La contraseña es incorrecta',
        });
    const token = yield (0, generate_jwt_1.generateJWT)(user.id);
    return res.json({
        user,
        token,
    });
});
exports.login = login;
const validateJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { token } = req.params;
        const secretKey = (_a = process.env.SECRETORPRIVATEKEY) !== null && _a !== void 0 ? _a : '';
        const isValidToken = jsonwebtoken_1.default.verify(token, secretKey);
        if (!isValidToken)
            return res.status(400).json({
                valid: false,
                msg: 'Token expirado',
            });
        const payload = jsonwebtoken_1.default.decode(token);
        const rawUser = yield user_1.default.findByPk(payload.uid);
        if (!rawUser)
            return res.status(404).json({
                msg: 'Usuario No encontrado'
            });
        const { password } = rawUser, user = __rest(rawUser, ["password"]);
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Formato incorrecto',
        });
    }
});
exports.validateJWT = validateJWT;
