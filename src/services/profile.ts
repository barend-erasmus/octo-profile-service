import { config } from './../config';

import { IProfileRepository } from '../repositories/profile';
import { IUserRepository } from '../repositories/user';

import { Profile } from '../entities/profile';
import { User } from '../entities/user';

export class ProfileService {

    constructor(
        private profileRepository: IProfileRepository,
        private userRepository: IUserRepository,
    ) {

    }

    public async create(profile: Profile, username: string): Promise<Profile> {

        profile.username = username;

        const existingProfile: Profile = await this.profileRepository.find(profile.id);

        if (existingProfile) {
            throw new Error('id already exist');
        }

        const user: User = await this.userRepository.find(profile.username);

        if (!user) {
            throw new Error('username does not exist');
        }

        profile = await this.profileRepository.create(profile);

        return profile;
    }

    public async find(id: string): Promise<Profile> {
        const profile: Profile = await this.profileRepository.find(id);

        return profile;
    }
}
