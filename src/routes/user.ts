import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import { User } from '../entities/user';
import { config } from './../config';
import { BaseRouter } from './base';

export class UserRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {

            if (req.query.userName && req.query.password) {

                const result: boolean = await BaseRouter.getUserService().authenticate(req.query.userName, req.query.password);

                if (result) {
                    const token = jsonwebtoken.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        userName: req.query.userName,
                    }, '=H6gMEL2h-8-UD6j');

                    res.json({
                        token,
                    });
                } else {
                    res.status(401).json({
                        message: 'invalid credentials',
                    });
                }

            } else {

                const decodedToken: any = jsonwebtoken.verify(req.get('Authorization').split(' ')[1], '=H6gMEL2h-8-UD6j');

                if (!decodedToken) {
                    res.status(401).end();
                    return;
                }

                req['user'] = decodedToken.userName;

                const result: User = await BaseRouter.getUserService().find(req['user']);

                res.json(result);
            }

        } catch (err) {
            res.status(500).json(err);
        }
    }

    public static async post(req: express.Request, res: express.Response) {
        try {

            const user: User = await BaseRouter.getUserService().create(req.body);

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    }
}
