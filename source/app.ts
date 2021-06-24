import express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from './routes/user';
import { ClassRoutes } from './routes/class';
import { AuthenticationRoutes } from './routes/authentication';
import { connect } from './config/mongoDB'
import cors from 'cors';

class App {
    public app: express.Application;
    public userRoutes: UserRoutes = new UserRoutes();
    public classRoutes: ClassRoutes = new ClassRoutes();
    public authRoutes: AuthenticationRoutes = new AuthenticationRoutes();

    public allowedOrigins: cors.CorsOptions = {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: '*',
        preflightContinue: false,
    }

    constructor() {
        this.app = express();
        this.config();
        connect();
        this.userRoutes.routes(this.app);
        this.authRoutes.routes(this.app);
        this.classRoutes.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // this.app.use(cors(this.options));
        this.app.use(cors(this.allowedOrigins));
        // this.app.options('*', cors(this.allowedOrigins));
    }

}

export default new App().app;