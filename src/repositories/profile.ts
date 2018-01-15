import { Profile } from '../entities/profile';

export interface IProfileRepository {
    create(profile: Profile): Promise<Profile>;
    find(id: string): Promise<Profile>;
}
