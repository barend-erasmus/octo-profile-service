import * as crypto from 'crypto';
import * as express from 'express';
import * as isBot from 'isbot';
import * as moment from 'moment';
import { Profile } from '../entities/profile';
import { Usage } from '../entities/usage';
import { UsageCounts } from '../models/usage-counts';
import { IProfileRepository } from '../repositories/profile';
import { IUsageRepository } from '../repositories/usage';

export class UsageService {

    constructor(
        private usageRepository: IUsageRepository,
        private profileRepository: IProfileRepository,
    ) {

    }

    public async counts(
        profileId: string,
    ): Promise<UsageCounts> {

        const profile: Profile = await this.profileRepository.find(profileId);

        if (!profile) {
            return null;
        }

        const countByFirstTime: any[] = await this.usageRepository.countByFirstTime(profileId, moment().subtract(7, 'd').toDate());

        const countByReferer: any[] = await this.usageRepository.countByReferer(profileId, moment().subtract(7, 'd').toDate());

        return new UsageCounts(
            countByFirstTime,
            countByReferer,
        );
    }

    public async create(
        req: express.Request,
        res: express.Response,
        profileId: string,
    ): Promise<void> {

        await this.usageRepository.create(new Usage(
            req.query ? (req.query.lastVisit ? false : true) : true,
            req.get('X-Real-IP') || '::1',
            profileId,
            req.get('referer'),
            new Date(),
            isBot(req.get('User-Agent')) ? 'bot' : 'browser',
        ));
    }

    public async list(
        profileId: string,
    ): Promise<Usage[]> {

        return this.usageRepository.list(profileId);
    }
}
