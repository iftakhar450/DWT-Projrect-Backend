

import { Request, Response } from "express";
import { TestController } from '../controllers/test'
import { TestResultController } from '../controllers/test-result'
import { UserController } from '../controllers/user'
import { Ultility } from '../utilities/all';
import { AuthenticationController } from "../controllers/authentication";

export class TestRoutes {

    public testController: TestController = new TestController();
    public testResultController: TestResultController = new TestResultController();
    public userController: UserController = new UserController();
    public allUtilities: Ultility = new Ultility();
    public auth: AuthenticationController = new AuthenticationController();

    public routes(app: any): void {
        // Subjects
        app.route('/test')
            .get(this.auth.authenticateToken,this.testController.getTestList)
            .post(this.auth.authenticateToken,this.testController.addNewTest, this.testResultController.getRegisteredStudentOfSubject,
                this.testResultController.createTestMarkcheet);

        // Subject detail
        app.route('/test/:id')
            // get specific subject
            .get(this.auth.authenticateToken,this.allUtilities.checkUserId, this.testController.getTestProfile)
            .put(this.auth.authenticateToken,this.allUtilities.checkUserId, this.testController.updateTestInfo)
            .delete(this.auth.authenticateToken,this.allUtilities.checkUserId, this.testController.deleteTest);

        app.route('/test/teacher/:id')
            .get(this.auth.authenticateToken,this.allUtilities.checkUserId, this.testController.getTestForTeacher)
        app.route('/test/markscheet/:id')
            .get(this.auth.authenticateToken,this.allUtilities.checkUserId, this.testController.findTest, this.testResultController.getmarksCheet);

        //  update test result
        app.route('/test/result')
            .post(this.auth.authenticateToken,this.testResultController.updateMultipleTestResult)
        //  update test single
        app.route('/test/singleresult')
            .post(this.auth.authenticateToken,this.testResultController.updateSingleResult)
        // get test for student by using subjects array
        app.route('/test/student')
            .post(this.auth.authenticateToken,this.testController.getTestListForStudents)

        // get test for student subject
        app.route('/testresult/subject')
            .post(this.auth.authenticateToken,this.testResultController.getResultForSubject)

        // studentResultCard 
        app.route('/test/result/card/:id').get(this.auth.authenticateToken,this.allUtilities.checkUserId, this.userController.getUserInfo, this.testResultController.getAllSubjectResultCard);
    }
}



// export = router;