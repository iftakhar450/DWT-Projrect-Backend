import * as mongoose from 'mongoose';
import { UserSchema } from './../models/user'
import { NextFunction, Request, Response } from 'express';
import  IUser  from './../interfaces/user';

const User = mongoose.model<IUser>('Users', UserSchema);

export class UserController {
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
            isDeleted: { $eq: 0 }
        }
        let fields = ['name', 'username', 'mobile_no', 'role']
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
        let fields = ['name', 'username', 'mobile_no', 'role']
        User.findOne(criteria)
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
}