

import { Request, Response } from "express";
import { ClassController } from './../controllers/class';
import { Ultility } from './../utilities/all';

export class ClassRoutes {

    public classController: ClassController = new ClassController();
    public allUtilities: Ultility = new Ultility()
    public routes(app: any): void {
        // console.log(app)
        // Classes
        app.route('/class')
            .get(this.classController.getClassList)
            .post(this.classController.addNewClass);

        // Class detail
        app.route('/class/:id')
            // get specific user
            .get(this.allUtilities.checkUserId, this.classController.getClassProfile)
            .put(this.allUtilities.checkUserId,this.classController.updateClassInfo)
            .delete(this.allUtilities.checkUserId,this.classController.deleteClass)
    }
}



// export = router;