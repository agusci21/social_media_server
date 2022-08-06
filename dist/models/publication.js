"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Publication extends sequelize_1.Model {
}
Publication.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    ownerId: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    photoUrl: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    amountOfLikes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    coments: {
        type: sequelize_1.DataTypes.JSON
    }
}, {
    tableName: 'publications',
    sequelize: connection_1.default,
    timestamps: false
});
exports.default = Publication;
