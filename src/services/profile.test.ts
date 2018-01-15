import { expect } from 'chai';
import 'mocha';

import { ProfileRepository } from './../repositories/sequelize/profile';

import { ProfileService } from './profile';
import { Profile } from '../entities/profile';


describe('ProfileService', () => {
    describe('create', () => {

        let profileRepository: ProfileRepository = null;
        let profileService: ProfileService = null;

        beforeEach(async () => {
            profileRepository = new ProfileRepository(null, null, null);
            await profileRepository.sync();

            profileService = new ProfileService(profileRepository);
        });
    
        afterEach(async () => {
            await profileRepository.sync();
            profileRepository = null;
            profileService = null;
        });

        it('should throw exception given existing id', async () => {

            await profileRepository.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, []));

            try {
                await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, []));
                throw new Error('Expected Error');
            }catch(err) {
                expect(err.message).to.be.eq('id already exist');
            }
        });
    });
});