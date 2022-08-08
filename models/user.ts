import { Sequelize, Model, DataTypes } from 'sequelize'
import db from '../db/connection'

class User extends Model {
  declare id: number
  declare name: string
  declare alias: string
  declare email: string
  declare password: string
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    alias: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    sequelize: db,
  },
)

export default User