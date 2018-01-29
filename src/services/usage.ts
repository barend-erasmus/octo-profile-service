import * as crypto from 'crypto';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import * as isBot from 'isbot';
import * as moment from 'moment';
import 'reflect-metadata';
import { Profile } from '../entities/profile';
import { Usage } from '../entities/usage';
import { UsageCounts } from '../models/usage-counts';
import { IProfileRepository } from '../repositories/profile';
import { IUsageRepository } from '../repositories/usage';

@injectable()
export class UsageService {

    constructor(
        @inject('IUsageRepository')
        private usageRepository: IUsageRepository,
        @inject('IProfileRepository')
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

        const countByFirstTime: any[] = await this.usageRepository.countByFirstTime(profileId, this.getDate7DaysFromNow());

        const countByReferer: any[] = await this.usageRepository.countByReferer(profileId, this.getDate7DaysFromNow());

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
            this.isFirstTimeVisit(req),
            this.getIPAddress(req),
            profileId,
            this.getReferer(req),
            new Date(),
            this.getRequestType(req),
        ));
    }

    public async list(
        profileId: string,
    ): Promise<Usage[]> {

        return this.usageRepository.list(profileId);
    }

    private getDate7DaysFromNow(): Date {
        return moment().subtract(7, 'd').toDate();
    }

    private getIPAddress(req: express.Request): string {
        return req.get('X-Real-IP') || '::1';
    }

    private getRequestType(req: express.Request): string {
        return isBot(req.get('User-Agent')) ? 'bot' : 'browser';
    }

    private getReferer(req: express.Request): string {
        return req.get('referer');
    }

    private isFirstTimeVisit(req: express.Request): boolean {
        return req.query ? (req.query.lastVisit ? false : true) : true;
    }
}
