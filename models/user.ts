import { Sequelize, Model, DataTypes } from 'sequelize'
import db from '../db/connection'

class User extends Model {
  declare id: string
  declare name: string
  declare email: string
  declare password: string
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
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