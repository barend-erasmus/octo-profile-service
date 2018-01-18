import { Usage } from '../entities/usage';

export interface IUsageRepository {
    countByReferer(profileId: string): Promise<any[]>;
    create(usage: Usage): Promise<Usage>;
    list(profileId: string): Promise<Usage[]>;
}
