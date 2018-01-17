import * as crypto from 'crypto';
import * as express from 'express';
import { Usage } from '../entities/usage';
import { IUsageRepository } from '../repositories/usage';
import { config } from './../config';

export class UsageService {

    constructor(
        private usageRepository: IUsageRepository,
    ) {

    }

    public async create(
         req: express.Request,
         res: express.Response,
         profileId: string,
    ): Promise<void> {

        await this.usageRepository.create(new Usage(
            req.cookies['lastVisit']? false : true,
            req.get('X-Real-IP') || '::1',
            profileId,
            req.get('referer'),
            new Date(),
        ));

        res.cookie('lastVisit', new Date().toString(), {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
    }

    public async list(
        profileId: string,
   ): Promise<Usage[]> {

       return this.usageRepository.list(profileId);
   }
}
