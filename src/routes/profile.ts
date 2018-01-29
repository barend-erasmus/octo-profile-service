import * as express from 'express';
import { Profile } from '../entities/profile';
import { WorkExperience } from '../entities/work-experience';
import { config } from './../config';
import { BaseRouter } from './base';

export class ProfileRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {

            if (req.query.id) {
                const profile: Profile = await BaseRouter.getProfileService().find(req.query.id);

                if (!req['user']) {
                    await BaseRouter.getUsageService().create(req, res, req.query.id);
                }

                res.json(profile);
            } else {
                const profiles: Profile[] = await BaseRouter.getProfileService().list(req['user']);
                res.json(profiles);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    public static async post(req: express.Request, res: express.Response) {
        try {

            if (req.body) {
                req.body.workExperiences.forEach((workExperience) => {
                    workExperience.to = new Date(workExperience.to);
                });
            }

            const profile: Profile = await BaseRouter.getProfileService().create(req.body, req['user']);

            res.json(profile);

        } catch (err) {
            res.status(500).json(err);
        }
    }

    public static async put(req: express.Request, res: express.Response) {
        try {

            const profile: Profile = await BaseRouter.getProfileService().update(req.body, req['user']);

            res.json(profile);

        } catch (err) {
            res.status(500).json(err);
        }
    }
}
