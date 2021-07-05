

import { Request, Response } from "express";
import { Ultility } from './../utilities/all';
import { UserController } from "../controllers/user";
import { SubjectController } from "../controllers/subject";
import { ChatController } from "../controllers/chat";

export class ChatRoutes {
    public allUtilities: Ultility = new Ultility()
    public userController: UserController = new UserController();
    public subjectController: SubjectController = new SubjectController();
    public chatontroller: ChatController = new ChatController();
    public routes(app: any): void {

        // all meembers for student  chat 
        app.route('/chat/menbers/student/:class_id')
            .get(this.userController.filterStudentByClass, this.subjectController.filterTeacherBySubject)

        // Chat 
        app.route('/message')
            .post(this.chatontroller.addNewMessage);
        app.route('/load/message')
            .post(this.chatontroller.filterMessageByUser);
        app.route('/message/group')
            .post(this.chatontroller.addMessageForGroup);
    }
}



// export = router;