import express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from './routes/user';
import { AuthenticationRoutes } from './routes/authentication';
import { connect } from './config/mongoDB'

class App {
    public app: express.Application;
    public userRoutes: UserRoutes = new UserRoutes();
    public authRoutes: AuthenticationRoutes = new AuthenticationRoutes();

    constructor() {
        this.app = express();
        this.config();
        connect();
        this.userRoutes.routes(this.app);
        this.authRoutes.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;