

import { Request, Response } from "express";
import { TestController } from '../controllers/Test';
import { Ultility } from '../utilities/all';

export class TestRoutes {

    public testController: TestController = new TestController();
    public allUtilities: Ultility = new Ultility()

    public routes(app: any): void {
        // Subjects
        app.route('/test')
            .get(this.testController.getTestList)
            .post(this.testController.addNewTest);

        // Subject detail
        app.route('/test/:id')
            // get specific subject
            .get(this.allUtilities.checkUserId, this.testController.getTestProfile)
            .put(this.allUtilities.checkUserId, this.testController.updateTestInfo)
            .delete(this.allUtilities.checkUserId, this.testController.deleteTest);
       
    }
}



// export = router;