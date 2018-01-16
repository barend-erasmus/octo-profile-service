import * as express from 'express';
import { Profile } from '../entities/profile';
import { config } from './../config';
import { BaseRouter } from './base';

export class ProfileRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {

            if (req.query.id) {
                const profile: Profile = await BaseRouter.getProfileService().find(req.query.id);
                res.json(profile);
            } else {
                const profiles: Profile[] = await BaseRouter.getProfileService().list(req['user']);
                res.json(profiles);
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
