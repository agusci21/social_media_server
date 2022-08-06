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
exports.getAllPublications = exports.createAPublication = void 0;
const publication_1 = __importDefault(require("../models/publication"));
const createAPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publication = publication_1.default.build(req.body);
        yield publication.save();
        return res.json({
            msg: 'Publicacion guardada',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ocurrio un error en el servidor',
        });
    }
});
exports.createAPublication = createAPublication;
const getAllPublications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const limit = Number.parseInt(((_a = req.query.limit) !== null && _a !== void 0 ? _a : '20'));
    try {
        const publications = yield publication_1.default.findAll({
            limit,
            order: [['createdAt', 'DESC']]
        });
        return res.json({
            publications,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ocurrio un error en el servidor',
        });
    }
});
exports.getAllPublications = getAllPublications;
