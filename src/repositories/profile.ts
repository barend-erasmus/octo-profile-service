import { Profile } from '../entities/profile';

export interface IProfileRepository {
    find(id: string): Promise<Profile>;
}
