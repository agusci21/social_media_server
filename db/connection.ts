import { Sequelize } from "sequelize";

const dbName : string = process.env.DB_NAME || ''
const dbUser : string = process.env.DB_USER || ''
const dbPassword : string = process.env.DB_PASSWORD|| ''

const db = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
})

export default db