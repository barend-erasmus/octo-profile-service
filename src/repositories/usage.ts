import { Usage } from '../entities/usage';

export interface IUsageRepository {
    countByFirstTime(profileId: string, since: Date): Promise<any[]>;
    countByReferer(profileId: string, since: Date): Promise<any[]>;
    create(usage: Usage): Promise<Usage>;
    list(profileId: string): Promise<Usage[]>;
}
