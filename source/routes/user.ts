

import { Request, Response } from "express";
import { UserController } from './../controllers/user';
import { AuthenticationController } from "../controllers/authentication";
import { Ultility } from './../utilities/all';

export class UserRoutes {

    public userController: UserController = new UserController();
    public allUtilities: Ultility = new Ultility();
    public auth: AuthenticationController = new AuthenticationController();

    public routes(app: any): void {
        // Users
        app.route('/user')
            .get(this.auth.authenticateToken,this.userController.getUserList)
            .post(this.auth.authenticateToken,this.userController.CreateUserID, this.userController.addNewUser);

        // User detail
        app.route('/user/:id')
            // get specific user
            .get(this.auth.authenticateToken,this.allUtilities.checkUserId, this.userController.getUserProfile)
            .put(this.auth.authenticateToken,this.allUtilities.checkUserId, this.userController.updateUserInfo)
            .delete(this.auth.authenticateToken,this.allUtilities.checkUserId,this.userController.checkTeacherSubject, this.userController.deleteUser);
            
        // user filter as teachers or students 
        app.route('/user/filter/:role')
            .get(this.auth.authenticateToken,this.userController.filterUser)
    }
}



// export = router;