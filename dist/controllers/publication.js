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
exports.createAPublication = void 0;
const publication_1 = __importDefault(require("../models/publication"));
const createAPublication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publication = publication_1.default.build(req.body);
        yield publication.save();
        return res.json({
            msg: 'Publicacion guardada'
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un error en el servidor'
        });
    }
});
exports.createAPublication = createAPublication;
