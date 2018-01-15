import { config } from './../config';

import { IProfileRepository } from '../repositories/profile';

import { Profile } from '../entities/profile';

export class ProfileService {

    constructor(
        private profileRepository: IProfileRepository,
    ) {

    }

    public async create(profile: Profile): Promise<Profile> {

        const existingProfile: Profile = await this.profileRepository.find(profile.id);

        if (existingProfile) {
            throw new Error('id already exist');
        }

        profile = await this.profileRepository.create(profile);

        return profile;
    }

    public async find(id: string): Promise<Profile> {
        const profile: Profile = await this.profileRepository.find(id);

        return profile;
    }
}
