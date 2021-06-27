import { Request, Response } from "express";
import { AuthenticationController } from './../controllers/authentication';

export class AuthenticationRoutes {

    public auth: AuthenticationController = new AuthenticationController();
    public routes(app: any): void {
        // Users
        app.route('/login')
            .post(this.auth.login);


    }

}