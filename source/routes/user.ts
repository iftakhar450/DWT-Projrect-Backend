

import { Request, Response } from "express";
import { UserController } from './../controllers/user';
import { UserUltility } from './../utilities/user';

export class UserRoutes {

    public userController: UserController = new UserController();
    public userUtilities: UserUltility = new UserUltility()

    public routes(app: any): void {
        // console.log(app)
        // Users
        app.route('/user')
            .get(this.userController.getUserList)
            .post(this.userController.addNewUser);

        // User detail
        app.route('/user/:id')
            // get specific user
            .get(this.userUtilities.checkUserId, this.userController.getUserProfile)
            .put(this.userUtilities.checkUserId,this.userController.updateUserInfo)
            .delete(this.userUtilities.checkUserId,this.userController.deleteUser)
    }
}



// export = router;