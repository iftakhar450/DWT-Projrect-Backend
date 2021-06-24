import * as mongoose from 'mongoose';
import { UserSchema } from './../models/user'
import { NextFunction, Request, Response } from 'express';
import config from './../config/config';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import IUser from './../interfaces/user';
const User = mongoose.model<IUser>('Users', UserSchema);

export class AuthenticationController {
    // login
    public login(req: Request, res: Response, next: NextFunction) {
        if (!req.body.username) {
            return res.status(400).json('Username required');
        } else if (!req.body.password) {
            return res.status(400).json('Password required');
        } else {
            User.findOne({ username: req.body.username }, function (err: any, user: IUser) {
                if (err) {
                    throw Error(err)
                }
                if (user) {
                    // bcrypt.compare(req.body.password, user.password.toString(), function (err: any, responce: any) {
                    // if (responce) {
                    if (user.password.toString() == req.body.password) {
                        var token = jwt.sign({
                            data: req.body.username
                        }, config.auth.PRIVATE_KEY, { expiresIn: '1h' });
                        // Send JWT
                        res.statusMessage = 'Your have loggedIn succesfully'
                        res.status(200).send({ username: user.username, name: user.name, token: token, role:user.role })
                    } else {
                        res.status(400).send('Invalid Password')
                    }
                    // });

                } else {
                    res.status(401).send('Unauthorized')
                }
            })
        }

    }

}