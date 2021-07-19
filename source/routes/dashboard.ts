

import { Request, Response } from "express";
import { DashboardController } from './../controllers/dashboard';
import { Ultility } from './../utilities/all';
import { AuthenticationController } from "../controllers/authentication";

export class DashboardRoutes {

    public dashboardController: DashboardController = new DashboardController();
    public allUtilities: Ultility = new Ultility();
    public auth: AuthenticationController = new AuthenticationController();

    public routes(app: any): void {
        // Users
        app.route('/dashboard/admin')
            .get(this.auth.authenticateToken,this.dashboardController.countStudent, this.dashboardController.countSubjects,
                this.dashboardController.countClasses, this.dashboardController.countTeachers)

    }
}



// export = router;