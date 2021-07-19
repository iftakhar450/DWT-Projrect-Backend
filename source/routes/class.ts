

import { Request, Response } from "express";
import { ClassController } from './../controllers/class';
import { SubjectController } from './../controllers/subject';
import { Ultility } from './../utilities/all';
import { AuthenticationController } from "../controllers/authentication";

export class ClassRoutes {

    public classController: ClassController = new ClassController();
    public subjectController: SubjectController = new SubjectController();
    public allUtilities: Ultility = new Ultility();
    public auth: AuthenticationController = new AuthenticationController();
    public routes(app: any): void {
        // Classes
        app.route('/class')
            .get(this.auth.authenticateToken, this.classController.getClassList)
            .post(this.auth.authenticateToken, this.classController.addNewClass, this.classController.assignClassToUser);

        // Class detail
        app.route('/class/:id')
            // get specific user
            .get(this.auth.authenticateToken, this.allUtilities.checkUserId, this.classController.getClassProfile)
            .put(this.auth.authenticateToken, this.allUtilities.checkUserId, this.classController.updateClassInfo, this.classController.assignClassToUser)
            .delete(this.auth.authenticateToken, this.allUtilities.checkUserId, this.classController.deAssignUserfromClass,
                this.classController.makeSubjectArchiveOfDeleteClass, this.classController.deleteClass)
        // get the subject for class
        app.route('/class/subject/:id')
            .get(this.auth.authenticateToken, this.allUtilities.checkUserId, this.subjectController.getSubjectForClass)
    }
}



// export = router;