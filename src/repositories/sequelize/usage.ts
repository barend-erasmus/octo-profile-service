import { Usage } from '../../entities/usage';
import { IUsageRepository } from './../usage';
import { BaseRepository } from './base';

export class UsageRepository extends BaseRepository implements IUsageRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
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
