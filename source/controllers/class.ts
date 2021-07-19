import * as mongoose from 'mongoose';
import { ClassSchema } from './../models/class'
import { NextFunction, Request, Response } from 'express';
import IClass from './../interfaces/class';
import IUser from './../interfaces/user';
import { UserSchema } from '../models/user';
import { SubjectSchema } from './../models/subject'
import ISubject from './../interfaces/subject';

const Subject = mongoose.model<ISubject>('Subjects', SubjectSchema);

const User = mongoose.model<IUser>('Users', UserSchema);
const Class = mongoose.model<IClass>('Classes', ClassSchema);

export class ClassController {
    // create user
    public addNewClass(req: Request, res: Response, next: NextFunction) {
        const c = new Class(req.body)
        return c.save()
            .then((result: any) => {
                if (req.body.students) {
                    req.body['class_id'] = result._id;
                    next();
                } else {
                    return res.status(201).json({ class: result })
                }
            })
            .catch((error: any) => {
                console.log(error)
                if (error.code == 11000) {
                    return res.status(409).json({ msg: 'Class already exsist with this name' })
                }

            })
    }

    public assignClassToUser(req: Request, res: Response, next: NextFunction) {
        // console.log(req.body)
        User.updateMany({ _id: { $in: req.body.students } }, { $set: { class: req.body.class_id } })
            .exec()
            .then((result: any) => {
                return res.status(201).json({ class: result })
            })
            .catch((error) => {
                return res.status(409).json(error)
            })

    }
    //  get user list
    public getClassList(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
        }
        let fields = ['name', 'students']
        Class.find(criteria)
            .select(fields)
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    classes: result
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
    public getClassProfile(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            _id: req.params.id,
            isDeleted: { $eq: 0 },

        }
        let fields = ['name']
        Class.findOne(criteria)
            .select(fields)
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
    public updateClassInfo(req: Request, res: Response, next: NextFunction) {
        Class.findOneAndUpdate({ _id: req.params.id }, req.body)
            .exec()
            .then((user: any) => {

                if (req.body.students) {
                    req.body['class_id'] = req.params.id;
                    next();
                } else {
                    return res.status(201).json({
                        msg: 'Class Updated Successfully'
                    })
                }

            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }

    // Deassign student from class
    public deAssignUserfromClass(req: Request, res: Response, next: NextFunction) {
        User.updateMany({ class: req.params.id }, { $unset: { class: 1 } })
            .exec()
            .then((result: any) => {
                // return res.status(201).json({ class: result })
                console.log(result);
                next();
            })
            .catch((error) => {
                console.log(error)
                return res.status(409).json(error)
            })
    }

    // makeSubjectArchiveOfDeleteClass
    public makeSubjectArchiveOfDeleteClass(req: Request, res: Response, next: NextFunction) {
        Subject.updateMany({ class: req.params.id }, { $set: { is_archive: 'y' } })
            .exec()
            .then((subject: any) => {
              next();
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }
    // delete user by id
    public deleteClass(req: Request, res: Response, next: NextFunction) {
        Class.remove({ _id: req.params.id })
            .exec()
            .then((user: any) => {
                return res.status(200).json({
                    msg: 'Class Deleted Successfully'
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }



}