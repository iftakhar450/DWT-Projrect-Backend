import mongoose from 'mongoose';
import config from './config';

import { UserSchema } from './../models/user'
import IUser from './../interfaces/user';
const User = mongoose.model<IUser>('Users', UserSchema);

var chalk = require('chalk');
var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

// let database: mongoose.Connection;
export const connect = () => {
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(config.mongo.URL, { useCreateIndex: true, useNewUrlParser: true });
    mongoose.connection.on('connected', function () {
        console.log(connected("MongoDB Connected"));
        User.findOne({ username: config.default_user.username }, function (err: any, doc: any) {
            if (err) {
                return console.error(err)
            }
            if (!doc || doc.length < 1) {
                User.create(config.default_user, function (err: any, doc: any) {
                    if (err) { return console.error(err) }
                    console.log(termination("New Admin Created"));
                })
            } else {
                console.log(termination("Admin Exsist"));
            }
        })

    });

    mongoose.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
};
export const disconnect = () => {
    // if (!database) {
    //     return;
    // }
    // Mongoose.disconnect();
};