import * as mongoose from 'mongoose';
import { ClassSchema } from './../models/class'
import { UserSchema } from './../models/user'
import { SubjectSchema } from './../models/subject'
import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/user';
import IClass from '../interfaces/class';
import ISubject from '../interfaces/subject';

const User = mongoose.model<IUser>('Users', UserSchema);
const Class = mongoose.model<IClass>('Classes', ClassSchema);
const Subject = mongoose.model<ISubject>('Subjects', SubjectSchema);

export class DashboardController {

    public countStudent(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
            role: { $eq: 'student' }
        }
        User.find(criteria)
            .exec()
            .then((result: any) => {
                req.body['total_students'] = result.length;
                next();
            })
            .catch((error: any) => {
                return res.status(500).json({
                    msg: error.message,
                    error
                });
            })
    }
    public countSubjects(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
        }
        Subject.find(criteria)
            .exec()
            .then((result: any) => {
                req.body['total_subjects'] = result.length;
                next();
            })
            .catch((error: any) => {
                return res.status(500).json({
                    msg: error.message,
                    error
                });
            })
    }
    public countClasses(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
        }
        Class.find(criteria)
            .exec()
            .then((result: any) => {
                req.body['total_classes'] = result.length;
                next();
            })
            .catch((error: any) => {
                return res.status(500).json({
                    msg: error.message,
                    error
                });
            })
    }
    public countTeachers(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
            role: { $eq: 'teacher' }
        }
        User.find(criteria)
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    total_students: req.body.total_students, total_subjects: req.body.total_subjects,
                    total_classes: req.body.total_classes, total_teachers: result.length
                })
            })
            .catch((error: any) => {
                return res.status(500).json({
                    msg: error.message,
                    error
                });
            })
    }
}