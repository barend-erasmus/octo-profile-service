import * as Sequelize from 'sequelize';
import { Usage } from '../../entities/usage';
import { IUsageRepository } from './../usage';
import { BaseRepository } from './base';

export class UsageRepository extends BaseRepository implements IUsageRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public async countByFirstTime(profileId: string, since: Date): Promise<any[]> {

        const result: any[] = await BaseRepository.models.Usage.findAll({
            attributes: ['firstTime', [ BaseRepository.sequelize.fn('COUNT', '*'), 'usageCount' ]],
            group: ['firstTime'],
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
            };
        });
    }

    public async countByReferer(profileId: string, since: Date): Promise<any[]> {

        const result: any[] = await BaseRepository.models.Usage.findAll({
            attributes: ['referer', [ BaseRepository.sequelize.fn('COUNT', '*'), 'usageCount' ]],
            group: ['referer'],
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
        ));
    }
}
