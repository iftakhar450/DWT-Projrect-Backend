import * as mongoose from 'mongoose';
import { ChatSchema } from './../models/chat'
import { NextFunction, Request, Response } from 'express';
import IChat from './../interfaces/class';

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export class ChatController {
    // create user
    public addNewMessage(req: Request, res: Response, next: NextFunction) {
        const c = new Chat(req.body)
        return c.save()
            .then((result: any) => {
                return res.status(201).json({ msg: result })
            })
            .catch((error: any) => {
                console.log(error)
                if (error.code == 11000) {
                    return res.status(409).json({ msg: 'Chat already exsist with this detail' })
                }

            })
    }

    public filterMessageByUser(req: Request, res: Response, next: NextFunction) {
        let criteria = {
            sender: { $in: req.body.filter },
            receiver: { $in: req.body.filter }
        }
        // console.log(criteria);
        // let fields = ['name', 'students']
        Chat.find(criteria)
            .exec()
            .then((result: any) => {
                return res.status(200).json({
                    chat: result
                })
            })
            .catch((error: any) => {
                return res.status(500).json({
                    msg: error.message,
                    error
                });
            })

    }

    public addMessageForGroup(req: Request, res: Response, next: NextFunction) {
        var Chat = mongoose.model('Chat', ChatSchema)
        Chat.insertMany(req.body.data)
            .then((result: any) => {
                return res.status(201).json({ msg: result })
            })
            .catch((error: any) => {
                console.log(error)
                if (error.code == 11000) {
                    return res.status(409).json({ msg: 'Chat already exsist with this detail' })
                }
            })
    }

    public newMessageCheck(req: Request, res: Response, next: NextFunction) {
        // console.log(req.params.id)
        Chat.findOne({ receiver: req.params.id, status: 'y' })
            .populate({ path: 'sender', select: { name: 1 } })
            .exec()
            .then((result: any) => {
                if (result) { 
                    Chat.updateMany({ receiver: req.params.id, status: 'y' }, { $set: { status: 'n' } })
                        .then((rus) => {
                            return res.status(201).json({ msg: rus })
                        })
                        .catch((error) => {
                            return res.status(409).json(error)
                        })
                }else {
                    return res.status(201).json('ok')
                }

            })
            .catch((error: any) => {
                console.log(error)
                return res.status(409).json(error)
            })
    }
}