import * as Sequelize from 'sequelize';
import { Usage } from '../../entities/usage';
import { IUsageRepository } from './../usage';
import { BaseRepository } from './base';

export class UsageRepository extends BaseRepository implements IUsageRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public async countByReferer(profileId: string): Promise<any[]> {

        const result: any[] = await BaseRepository.models.Usage.findAll({
            attributes: ['referer', [ BaseRepository.sequelize.fn('COUNT', '*'), 'usageCount' ]],
            group: ['referer'],
            where: {
                profileId,
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
