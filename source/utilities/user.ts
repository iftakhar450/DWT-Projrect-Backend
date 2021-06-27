

import { NextFunction, Request, Response } from 'express';


export class Ultility {
    public checkUserId(req: Request, res: Response, next: NextFunction) {
        if (req.params.id) {
            next()
        } else {
            return res.status(406).json({
                msg: 'User ID not given'
            });
        }
    }
}