

import { Request, Response } from "express";
import { SubjectController } from './../controllers/subject';
import { Ultility } from './../utilities/all';

export class SubjectRoutes {

    public subjectController: SubjectController = new SubjectController();
    public allUtilities: Ultility = new Ultility()

    public routes(app: any): void {
        // Subjects
        app.route('/subject')
            .get(this.subjectController.getSubjectList)
            .post(this.subjectController.addNewSubject);

        // Subject detail
        app.route('/subject/:id')
            // get specific subject
            .get(this.allUtilities.checkUserId, this.subjectController.getSubjectProfile)
            .put(this.allUtilities.checkUserId, this.subjectController.updateSubjectInfo)
            .delete(this.allUtilities.checkUserId, this.subjectController.deleteSubject);
        app.route('/subject/teacher/:id')
            .get(this.allUtilities.checkUserId, this.subjectController.getTeacherSubjects)
       
    }
}



// export = router;