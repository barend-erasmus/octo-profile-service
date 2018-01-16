import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import { User } from '../entities/user';
import { config } from './../config';
import { BaseRouter } from './base';

export class UserRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {

            const result: boolean = await BaseRouter.getUserService().authenticate(req.query.username, req.query.password);

            if (result) {
                const token = jsonwebtoken.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    username: req.query.username,
                }, '=H6gMEL2h-8-UD6j');

                res.json({
                    token,
                });
            } else {
                res.status(401).json({
                    message: 'invalid credentials',
                });
            }

        } catch (err) {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            });
        }
    }

    public static async post(req: express.Request, res: express.Response) {
        try {

            const user: User = await BaseRouter.getUserService().create(req.body);

            res.json(user);

        } catch (err) {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            });
        }
    }
}
