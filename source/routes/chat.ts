

import { Request, Response } from "express";
import { Ultility } from './../utilities/all';
import { UserController } from "../controllers/user";
import { SubjectController } from "../controllers/subject";
import { ChatController } from "../controllers/chat";
import { ClassController } from "../controllers/class";
import { AuthenticationController } from "../controllers/authentication";

export class ChatRoutes {
    public allUtilities: Ultility = new Ultility()
    public userController: UserController = new UserController();
    public subjectController: SubjectController = new SubjectController();
    public chatontroller: ChatController = new ChatController();
    public classController: ClassController = new ClassController();
    public auth: AuthenticationController = new AuthenticationController();
    public routes(app: any): void {

        // all meembers for student  chat 
        app.route('/chat/members/student/:class_id')
            .get(this.auth.authenticateToken, this.userController.filterStudentByClass, this.subjectController.filterTeacherBySubject)

        // All members for teachers
        app.route('/chat/members/teacher/:id')
            .get(this.subjectController.getClassIdFromTeacherSubject)
        // Chat 
        app.route('/message')
            .post(this.auth.authenticateToken, this.chatontroller.addNewMessage);
        app.route('/load/message')
            .post(this.auth.authenticateToken, this.chatontroller.filterMessageByUser);
        app.route('/message/group')
            .post(this.auth.authenticateToken, this.chatontroller.addMessageForGroup);

        app.route('/message/check/:id')
            .get(this.auth.authenticateToken, this.chatontroller.newMessageCheck)
    }
}



// export = router;