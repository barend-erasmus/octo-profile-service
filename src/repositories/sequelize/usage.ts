import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as Sequelize from 'sequelize';
import { Usage } from '../../entities/usage';
import { IUsageRepository } from './../usage';
import { BaseRepository } from './base';

@injectable()
export class UsageRepository extends BaseRepository implements IUsageRepository {

    constructor(host: string, userName: string, password: string) {
        super(host, userName, password);
    }

    public async countByFirstTime(profileId: string, since: Date): Promise<any[]> {

        const result: any[] = await BaseRepository.models.Usage.findAll({
            attributes: ['firstTime', 'type', [ BaseRepository.sequelize.fn('COUNT', '*'), 'usageCount' ]],
            group: ['firstTime', 'type'],
            where: {
                profileId,
                timestamp: {
                    [Sequelize.Op.gt]: since,
                },
            },
        });

        return result.map((x) => {
            return {
                count: x.dataValues.usageCount,
                firstTime: x.dataValues.firstTime,
                type: x.dataValues.type,
            };
        });
    }

    public async countByReferer(profileId: string, since: Date): Promise<any[]> {

        const result: any[] = await BaseRepository.models.Usage.findAll({
            attributes: ['referer', 'type', [ BaseRepository.sequelize.fn('COUNT', '*'), 'usageCount' ]],
            group: ['referer', 'type'],
            where: {
                profileId,
                timestamp: {
                    [Sequelize.Op.gt]: since,
                },
            },
        });

        return result.map((x) => {
            return {
                count: x.dataValues.usageCount,
                referer: x.dataValues.referer,
                type: x.dataValues.type,
            };
        });
    }

    public async create(usage: Usage): Promise<Usage> {

        const result: any = await BaseRepository.models.Usage.create(usage, {
        });

        return usage;
    }

    public async list(profileId: string): Promise<Usage[]> {

        const result: any[] = await BaseRepository.models.Usage.findAll({
            where: {
                profileId,
            },
        });

        return result.map((x) => new Usage(
            x.firstTime,
            x.ipAddress,
            x.profileId,
            x.referer,
            x.timestamp,
            x.type,
        ));
    }
}
