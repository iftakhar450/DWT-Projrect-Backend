

import { NextFunction, Request, Response } from 'express';


export class Ultility {
    public checkUserId(req: Request, res: Response, next: NextFunction) {
        console.log(req.params)
        if (req.params.id) {
            next()
        } else {
            return res.status(406).json({
                msg: 'ID not given'
            });
        }
    }
}