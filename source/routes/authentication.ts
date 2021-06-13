import { Request, Response } from "express";
import { AuthenticationController } from './../controllers/authentication';

export class AuthenticationRoutes {

    public auth: AuthenticationController = new AuthenticationController();
    public routes(app: any): void {
        // console.log(app)
        // Users
        app.route('/login')
            .post(this.auth.login);


    }

}