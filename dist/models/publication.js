"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("sequelize/types");
const connection_1 = __importDefault(require("../db/connection"));
class Publication extends types_1.Model {
}
Publication.init({
    id: {
        type: types_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    ownerId: {
        type: types_1.DataTypes.BIGINT,
        allowNull: false,
    },
    photoUrl: {
        type: types_1.DataTypes.STRING,
        allowNull: false,
    },
    amountOfLikes: {
        type: types_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    coments: {
        type: types_1.DataTypes.ARRAY,
        allowNull: true,
    }
}, {
    tableName: 'publications',
    sequelize: connection_1.default
});
