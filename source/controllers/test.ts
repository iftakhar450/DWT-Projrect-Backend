import * as mongoose from 'mongoose';
import { TestSchema } from './../models/Test';
import { NextFunction, Request, Response } from 'express';
import  ITest  from './../interfaces/Test'

const Test = mongoose.model<ITest>('Tests', TestSchema);

export class TestController {
    // create Test
    public addNewTest(req: Request, res: Response, next: NextFunction) {
        const test = new Test(req.body)
        return test.save()
            .then((result: any) => {
                return res.status(201).json({ test: result })
            })
            .catch((error: any) => {
                console.log(error)
                if (error.code == 11000) {
                    return res.status(409).json({ msg: 'Test already exsist with this detail' })
                }
                return res.status(409).json(error)
            })
    }
    //  get test list
    public getTestList(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            isDeleted: { $eq: 0 },
        }
        let fields = ['title', 's_id']
        Test.find(criteria)
            .select(fields)
            .populate('class', '_id name')
            .populate('teacher', '_id name')
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    Tests: result
                })
            })
            .catch((error: any) => {
                return res.status(500).json({
                    msg: error.message,
                    error
                });
            })
    }

    // get Test profile by id
    public getTestProfile(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            _id: req.params.id,
            isDeleted: { $eq: 0 },

        }
        let fields = ['name']
        Test.findOne(criteria)
            .select(fields)
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    tests: result
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }

    // update Test profile
    public updateTestInfo(req: Request, res: Response, next: NextFunction) {
        Test.findOneAndUpdate({ _id: req.params.id }, req.body)
            .exec()
            .then((test: any) => {
                return res.status(201).json({
                    msg: 'Test Updated Successfully'
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }

    // delete Test by id
    public deleteTest(req: Request, res: Response, next: NextFunction) {
        Test.remove({ _id: req.params.id })
            .exec()
            .then((test: any) => {
                return res.status(200).json({
                    msg: 'Test Deleted Successfully'
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