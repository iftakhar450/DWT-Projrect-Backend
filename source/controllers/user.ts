import * as mongoose from 'mongoose';
import { UserSchema } from './../models/user'
import { NextFunction, Request, Response } from 'express';
import IUser from './../interfaces/user';
import { SubjectSchema } from '../models/subject';
import ISubject from '../interfaces/subject';

const Subject = mongoose.model<ISubject>('Subjects', SubjectSchema);
const User = mongoose.model<IUser>('Users', UserSchema);

export class UserController {
    // create user ID
    public CreateUserID(req: Request, res: Response, next: NextFunction) {
        let random = Math.random().toString(36).substring(7);
        if (req.body.role == 'student') {
            random = 'std-' + random;
        } else if (req.body.role == 'teacher') {
            random = 'tec-' + random;
        } else {
            random = 'adm-' + random;
        }
        req.body['user_id'] = random;
        next();
    }

    // create user
    public addNewUser(req: Request, res: Response, next: NextFunction) {
        const user = new User(req.body)
        return user.save()
            .then((result: any) => {
                return res.status(201).json({ user: result })
            })
            .catch((error: any) => {
                console.log(error.code)
                if (error.code == 11000) {
                    return res.status(409).json({ msg: 'User already exsist with this Username' })
                }
                return res.status(409).json(error)
            })
    }

    //  get user list
    public getUserList(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
            username: { $ne: 'root' }
        }
        let fields = ['name', 'username', 'mobile_no', 'role', 'user_id']
        User.find(criteria)
            .select(fields)
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    users: result
                })
            })
            .catch((error: any) => {
                return res.status(500).json({
                    msg: error.message,
                    error
                });
            })
    }

    // get user profile by id
    public getUserProfile(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            _id: req.params.id,
            isDeleted: { $eq: 0 },

        }
        let fields = ['name', 'username', 'mobile_no', 'role', 'password', 'class']
        User.findOne(criteria)
            .select(fields)
            .populate({ path: 'class', select: { name: 1 } })
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    user: result
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }

    // update user profile
    public updateUserInfo(req: Request, res: Response, next: NextFunction) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body)
            .exec()
            .then((user: any) => {
                return res.status(201).json({
                    msg: 'User Updated Successfully'
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }

    // check if user is teacher check subjects 
    public checkTeacherSubject(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            _id: req.params.id,
            isDeleted: { $eq: 0 },
        }
        User.findOne(criteria)
            .exec()
            .then((result: any) => {
                if (result && result.role == 'teacher') {
                    let criteria = {
                        isDeleted: { $eq: 0 },
                        is_archive: { $eq: 'n' },
                        teacher: { $eq: req.params.id },
                    }
                    let fields = ['title', 's_id']
                    Subject.find(criteria)
                        .exec()
                        .then((resu: any) => {
                            if (resu.length == 0) {
                                next();
                            } else {
                                res.status(202).json({ msg: 'Can not deleted teacher has subject', code:true })
                            }
                        })
                } else {
                    next();
                }
            })


    }
    // delete user by id
    public deleteUser(req: Request, res: Response, next: NextFunction) {
        User.remove({ _id: req.params.id })
            .exec()
            .then((user: any) => {
                return res.status(200).json({
                    msg: 'User Deleted Successfully'
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }

    // filter user as teacher or students
    public filterUser(req: Request, res: Response, next: NextFunction) {
        if (req.params.role) {
            let criteria = {
                isDeleted: { $eq: 0 },
                role: { $eq: req.params.role }
            }
            let fields = ['name', 'username', 'mobile_no', 'role', 'user_id']
            User.find(criteria)
                .select(fields)
                .exec()
                .then((result: any) => {
                    return res.status(200).json({
                        users: result
                    })
                })
                .catch((error: any) => {
                    return res.status(500).json({
                        msg: error.message,
                        error
                    });
                })
        } else {
            return res.status(400).json({ msg: 'Filter string not found' })
        }


    }


    public getUserInfo(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            _id: req.params.id,
            // isDeleted: { $eq: 0 },
        }
        let fields = ['name', 'username', 'mobile_no', 'role', 'password', 'class']
        User.findOne(criteria)
            .select(fields)
            .populate({ path: 'class', select: { name: 1 } })
            .exec()
            .then((result: any) => {
                // return res.status(200).json({
                //     user: result
                // })
                req.body['user'] = result;
                next();
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }



    public filterStudentByClass(req: Request, res: Response, next: NextFunction) {

        if (req.params.class_id) {
            let criteria = {
                isDeleted: { $eq: 0 },
                class: { $eq: req.params.class_id }
            }
            let fields = ['name', '_id']
            User.find(criteria)
                .select(fields)
                .exec()
                .then((result: any) => {
                    req.body['students'] = result;
                    next();
                    // return res.status(200).json({
                    //     students: result
                    // })
                })
                .catch((error: any) => {
                    return res.status(500).json({
                        msg: error.message,
                        error
                    });
                })
        } else {
            return res.status(400).json({ msg: 'Filter string not found' })
        }

    }

}