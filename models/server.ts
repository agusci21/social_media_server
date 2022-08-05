import express, { Application } from 'express'
import userRoutes from '../routes/user';
import authRoutes from '../routes/auth';
import publicationRoutes from '../routes/publication'
import cors from 'cors';
import dotEnv from 'dotenv'
import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth',
        publication: '/api/publicate',
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';
        
        // Métodos iniciales
        this.dbConnection();
        this.middlewares(); // Es importante este orden en los metodos del constructor
        this.routes();
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error: any) {
            throw new Error( error );
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

    }


    routes() {
        this.app.use( this.apiPaths.users, userRoutes )
        this.app.use( this.apiPaths.auth, authRoutes )
        this.app.use( this.apiPaths.publication, publicationRoutes )
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;