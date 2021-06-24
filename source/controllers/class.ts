import * as mongoose from 'mongoose';
import { ClassSchema } from './../models/class'
import { NextFunction, Request, Response } from 'express';
import IClass from './../interfaces/class';

const Class = mongoose.model<IClass>('Classes', ClassSchema);

export class ClassController {
    // create user
    public addNewClass(req: Request, res: Response, next: NextFunction) {
        const user = new Class(req.body)
        return user.save()
            .then((result: any) => {
                return res.status(201).json({ user: result })
            })
            .catch((error: any) => {
                console.log(error.code)
                if (error.code == 11000) {
                    return res.status(409).json({ msg: 'Class already exsist with this name' })
                }
                return res.status(409).json(error)
            })
    }
    //  get user list
    public getClassList(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
        }
        let fields = ['name']
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
                return res.status(201).json({
                    msg: 'Class Updated Successfully'
                })
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