import { DataTypes, Model } from "sequelize/types";
import db from "../db/connection";

class Publication extends Model{
    declare id: number
    declare ownerId: number
    declare photoUrl: string
    declare amountOfLikes : number
    declare coments: string[]
}

Publication.init({

    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    ownerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amountOfLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    coments: {
        type: DataTypes.ARRAY,
        allowNull: true,
    }


},{
    tableName: 'publications',
    sequelize: db
})