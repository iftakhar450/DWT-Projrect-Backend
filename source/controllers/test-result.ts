import * as mongoose from 'mongoose';
import { TestResultSchema } from './../models/test-result';
import { TestSchema } from './../models/test';
import { NextFunction, Request, Response } from 'express';
import ITestResult from './../interfaces/test-result'
import ITest from './../interfaces/test'
// const ObjectID  = mongoose.Schema.Types.ObjectId;
var ObjectId = require('mongoose').Types.ObjectId;
const TestResult = mongoose.model<ITestResult>('TestResults', TestResultSchema);
const Test = mongoose.model<ITest>('Tests', TestSchema);

export class TestResultController {
    // create markcheet for test
    public getRegisteredStudentOfSubject(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            _id: req.body.newTestId,
            isDeleted: { $eq: 0 },
        }
        let fields = ['name', 'date', 'status']
        Test.findById(criteria)
            .select(fields)
            .populate({
                path: 'subject', select: { 'updatedAt': 0, 'createdAt': 0, 'isDeleted': 0 },
                populate: {
                    path: 'class', select: { 'updatedAt': 0, 'createdAt': 0, 'isDeleted': 0 },
                    populate: { path: 'students', select: { '_id': 1 } }
                }
            })
            .exec()
            .then((result: any) => {
                if (result.subject.class.students.length > 0) {
                    req.body['students'] = result.subject.class.students;
                    next();
                } else {
                    return res.status(200).json({
                        msg: 'No student register in this subject'
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

    public createTestMarkcheet(req: Request, res: Response, next: NextFunction) {
        let markscheet: any = [];
        req.body.students.forEach((element: any) => {
            let obj = {
                result: 0,
                test: req.body.newTestId,
                subject: new ObjectId(req.body.subject),
                student: element._id

            }
            markscheet.push(obj);
        });
        // const testResult = new TestResult(markscheet)
        return TestResult.collection.insertMany(markscheet)
            .then((result: any) => {
                return res.status(201).json({ msg: 'Test Created' })
            })
            .catch((error: any) => {
                console.log(error)
                // return res.status(409).json({ msg: 'Test already exsist with this detail' })
                return res.status(409).json(error)
            })

    }

    public getmarksCheet(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            test: req.params.id,
        }
        TestResult.find(criteria)
            .populate({ path: 'student', select: { name: 1, user_id: 1 } })
            .exec()
            .then((result: any) => {

                return res.status(200).json({ test: req.body.test, markssheet: result })

            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }


    public updateMultipleTestResult(req: Request, res: Response, next: NextFunction) {

        if (req.body.length > 0) {
            let updateData: any[] = [];
            req.body.forEach((element: any) => {
                updateData.push({
                    updateOne: {
                        filter: { _id: element._id },
                        update: {
                            $set: {
                                result: element.result,
                            }
                        }, upsert: true
                    }
                });
            });
            TestResult.bulkWrite(updateData, { ordered: false })
                .then((test: any) => {
                    return res.status(201).json({
                        msg: 'Test Result Updated Successfully'
                    })
                })
                .catch((error: any) => {
                    console.log(error);
                    return res.status(412).json({
                        msg: error.message,
                        error
                    });
                })
        } else {

            return;
        }



    }

    public updateSingleResult(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        TestResult.updateOne({ _id: req.body._id }, { $set: { result: req.body.result } })
            .exec()
            .then((result: any) => {
                return res.status(201).json({
                    msg: 'Result Updated Successfully'
                })
            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
        return;
    }
    public getResultForSubject(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            subject: req.body.data.s_id,
            student: req.body.data.id
        }
        // console.log(criteria)
        TestResult.find(criteria)
            .populate('test')
            .exec()
            .then((response: any) => {

                return res.status(200).json({ allTest: response })

            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })

    }


    public getAllSubjectResultCard(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            student: req.params.id
        }
        // console.log(criteria)
        TestResult.find(criteria)
            .populate('test')
            .exec()
            .then((response: any) => {
                return res.status(200).json({ user: req.body.user, resultData: response })

            })
            .catch((error: any) => {
                return res.status(412).json({
                    msg: error.message,
                    error
                });
            })
    }





}
