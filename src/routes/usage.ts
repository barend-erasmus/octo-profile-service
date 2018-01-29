import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import { Usage } from '../entities/usage';
import { CustomError } from '../errors/custom-error';
import { UsageCounts } from '../models/usage-counts';
import { config } from './../config';
import { BaseRouter } from './base';

export class UsageRouter extends BaseRouter {

    public static async counts(req: express.Request, res: express.Response) {
        try {

            const result: UsageCounts = await BaseRouter.getUsageService().counts(req.query.id);

            res.json(result);

        } catch (err) {
            res.status(500).json(CustomError.fromError(err));
        }
    }
}
