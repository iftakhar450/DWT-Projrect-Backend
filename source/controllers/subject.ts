import * as mongoose from 'mongoose';
import { SubjectSchema } from './../models/subject'
import { NextFunction, Request, Response } from 'express';
import ISubject from './../interfaces/subject';

const Subject = mongoose.model<ISubject>('Subjects', SubjectSchema);

export class SubjectController {
    // create subject
    public addNewSubject(req: Request, res: Response, next: NextFunction) {
        const subject = new Subject(req.body)
        return subject.save()
            .then((result: any) => {
                return res.status(201).json({ subject: result })
            })
            .catch((error: any) => {
                if (error.code == 11000) {
                    return res.status(409).json({ msg: 'Subject already exsist with this name' })
                }
                return res.status(409).json(error)
            })
    }
    //  get subject list
    public getSubjectList(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
        }
        let fields = ['title', 's_id']
        Subject.find(criteria)
            .select(fields)
            .populate('class', '_id name')
            .populate('teacher', '_id name')
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    subjects: result
                })
            })
            .catch((error: any) => {
                return res.status(500).json({
                    msg: error.message,
                    error
                });
            })
    }

    // get subject profile by id
    public getSubjectProfile(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            _id: req.params.id,
            isDeleted: { $eq: 0 },

        }
        let fields = ['name']
        Subject.findOne(criteria)
            .select(fields)
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    subject: result
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }

    // update subject profile
    public updateSubjectInfo(req: Request, res: Response, next: NextFunction) {
        Subject.findOneAndUpdate({ _id: req.params.id }, req.body)
            .exec()
            .then((subject: any) => {
                return res.status(201).json({
                    msg: 'Subject Updated Successfully'
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }

    // delete subject by id
    public deleteSubject(req: Request, res: Response, next: NextFunction) {
        Subject.remove({ _id: req.params.id })
            .exec()
            .then((subject: any) => {
                return res.status(200).json({
                    msg: 'Subject Deleted Successfully'
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }

    // filter subject for teacher 
    public getTeacherSubjects(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
            teacher: { $eq: req.params.id },
        }
        let fields = ['title', 's_id']
        Subject.find(criteria)
            .select(fields)
            .populate({ path: 'class', select: { 'updatedAt': 0, 'createdAt': 0, 'isDeleted': 0 } })
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    subjects: result
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