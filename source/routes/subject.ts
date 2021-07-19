

import { Request, Response } from "express";
import { SubjectController } from './../controllers/subject';
import { UserController } from './../controllers/user';
import { Ultility } from './../utilities/all';
import { AuthenticationController } from "../controllers/authentication";

export class SubjectRoutes {

    public subjectController: SubjectController = new SubjectController();
    public userController: UserController = new UserController();
    public allUtilities: Ultility = new Ultility();
    public auth: AuthenticationController = new AuthenticationController();

    public routes(app: any): void {
        // Subjects
        app.route('/subject')
            .get(this.auth.authenticateToken, this.subjectController.getSubjectList)
            .post(this.subjectController.addNewSubject);

        // Subject detail
        app.route('/subject/:id')
            // get specific subject
            .get(this.auth.authenticateToken, this.allUtilities.checkUserId, this.subjectController.getSubjectProfile)
            .put(this.auth.authenticateToken, this.allUtilities.checkUserId, this.subjectController.updateSubjectInfo)
            .delete(this.auth.authenticateToken, this.allUtilities.checkUserId, this.subjectController.checkTestForSubject,
                this.subjectController.deleteSubject);
        app.route('/subject/teacher/:id')
            .get(this.auth.authenticateToken, this.allUtilities.checkUserId, this.subjectController.getTeacherSubjects)
        app.route('/subject/archive/:id')
            .post(this.auth.authenticateToken, this.allUtilities.checkUserId, this.subjectController.archiveSubject)

    }
}



// export = router;