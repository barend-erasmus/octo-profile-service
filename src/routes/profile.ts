import * as express from 'express';
import { config } from './../config';
import { BaseRouter } from './base';

import { Profile } from '../entities/profile';

export class ProfileRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {

            const profile: Profile = await BaseRouter.getProfileService().find(req.query.id);

            res.json(profile);

        } catch (err) {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            });
        }
    }

    public static async post(req: express.Request, res: express.Response) {
        try {

            const profile: Profile = await BaseRouter.getProfileService().create(req.body, req['user']);

            res.json(profile);

        } catch (err) {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            });
        }
    }

    public static async put(req: express.Request, res: express.Response) {
        try {

            const profile: Profile = await BaseRouter.getProfileService().update(req.body, req['user']);

            res.json(profile);

        } catch (err) {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            });
        }
    }
}
