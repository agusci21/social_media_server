import { Sequelize, Model, DataTypes } from 'sequelize'
import db from '../db/connection'

class Publication extends Model {
    declare id: number
    declare ownerId: number
    declare photoUrl: string
    declare amountOfLikes : number
    declare coments: string[]
}

Publication.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    ownerId: {
        type:DataTypes.BIGINT,
    },
    photoUrl: {
        type: DataTypes.STRING,
        unique: true
    },
    amountOfLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    coments: {
        type: DataTypes.JSON
    }
    
  },
  {
    tableName: 'publications',
    sequelize: db,
    timestamps: true
  },
)

export default Publication