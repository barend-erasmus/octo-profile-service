import { expect } from 'chai';
import 'mocha';

import { BaseRepository } from './../repositories/sequelize/base';
import { ProfileRepository } from './../repositories/sequelize/profile';
import { UserRepository } from '../repositories/sequelize/user';

import { ProfileService } from './profile';

import { Profile } from '../entities/profile';
import { User } from '../entities/user';


describe('ProfileService', () => {
    describe('create', () => {

        let baseRepository: BaseRepository = null;
        let profileRepository: ProfileRepository = null;
        let userRepository: UserRepository = null;

        let profileService: ProfileService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            profileRepository = new ProfileRepository(null, null, null);
            userRepository = new UserRepository(null, null, null);

            await baseRepository.sync();

            profileService = new ProfileService(profileRepository, userRepository);
        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
            profileRepository = null;
            userRepository = null;

            profileService = null;
        });

        it('should throw exception given non-existing username', async () => {

            try {
                await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'non-existing-username');
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('username does not exist');
            }
        });

        it('should throw exception given existing id', async () => {

            await userRepository.create(new User('existing-username', '12345678'));

            await profileRepository.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, 'existing-username', null, []));

            try {
                await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('id already exist');
            }
        });
    });
});