import { Usage } from '../entities/usage';

export interface IUsageRepository {
    create(usage: Usage): Promise<Usage>;
    list(profileId: string): Promise<Usage[]>
}
