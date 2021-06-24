

import { Request, Response } from "express";
import { UserController } from './../controllers/user';
import { Ultility } from './../utilities/all';

export class UserRoutes {

    public userController: UserController = new UserController();
    public allUtilities: Ultility = new Ultility()

    public routes(app: any): void {
        // console.log(app)
        // Users
        app.route('/user')
            .get(this.userController.getUserList)
            .post(this.userController.CreateUserID,this.userController.addNewUser);

        // User detail
        app.route('/user/:id')
            // get specific user
            .get(this.allUtilities.checkUserId, this.userController.getUserProfile)
            .put(this.allUtilities.checkUserId,this.userController.updateUserInfo)
            .delete(this.allUtilities.checkUserId,this.userController.deleteUser)
    }
}



// export = router;