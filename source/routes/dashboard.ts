

import { Request, Response } from "express";
import { DashboardController } from './../controllers/dashboard';
import { Ultility } from './../utilities/all';

export class DashboardRoutes {

    public dashboardController: DashboardController = new DashboardController();
    public allUtilities: Ultility = new Ultility()

    public routes(app: any): void {
        // Users
        app.route('/dashboard/admin')
            .get(this.dashboardController.countStudent, this.dashboardController.countSubjects,
                this.dashboardController.countClasses, this.dashboardController.countTeachers)
    }
}



// export = router;