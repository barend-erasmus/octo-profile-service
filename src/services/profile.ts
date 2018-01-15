import { config } from './../config';

import { IProfileRepository } from '../repositories/profile';

import { Profile } from '../entities/profile';

export class ProfileService {

    constructor(
        private profileRepository: IProfileRepository,
    ) {

    }
    public async find(id: string): Promise<Profile> {
        const profile: Profile = await this.profileRepository.find(id);

        return profile;
    }
}
