

import { Request, Response } from "express";
import { ClassController } from './../controllers/class';
import { SubjectController } from './../controllers/subject';
import { Ultility } from './../utilities/all';

export class ClassRoutes {

    public classController: ClassController = new ClassController();
    public subjectController: SubjectController = new SubjectController();
    public allUtilities: Ultility = new Ultility()
    public routes(app: any): void {
        // Classes
        app.route('/class')
            .get(this.classController.getClassList)
            .post(this.classController.addNewClass, this.classController.assignClassToUser);

        // Class detail
        app.route('/class/:id')
            // get specific user
            .get(this.allUtilities.checkUserId, this.classController.getClassProfile)
            .put(this.allUtilities.checkUserId, this.classController.updateClassInfo, this.classController.assignClassToUser)
            .delete(this.allUtilities.checkUserId, this.classController.deleteClass)
        // get the subject for class
        app.route('/class/subject/:id')
            .get(this.allUtilities.checkUserId, this.subjectController.getSubjectForClass)
    }
}



// export = router;