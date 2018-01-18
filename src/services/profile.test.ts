import { expect } from 'chai';
import 'mocha';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/sequelize/user';
import { BaseRepository } from './../repositories/sequelize/base';
import { ProfileRepository } from './../repositories/sequelize/profile';
import { ProfileService } from './profile';
import { UserService } from './user';

describe('ProfileService', () => {
    describe('create', () => {

        let baseRepository: BaseRepository = null;
        let profileRepository: ProfileRepository = null;
        let userRepository: UserRepository = null;

        let profileService: ProfileService = null;
        let userService: UserService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            profileRepository = new ProfileRepository(null, null, null);
            userRepository = new UserRepository(null, null, null);

            await baseRepository.sync();

            profileService = new ProfileService(profileRepository, userRepository);
            userService = new UserService(userRepository);

        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
            profileRepository = null;
            userRepository = null;

            profileService = null;
            userService = null;

        });

        it('should throw exception given non-existing username', async () => {

            try {
                await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'non-existing-username');
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('username does not exist');
            }

        });

        it('should not throw exception given existing username', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

        });

        it('should throw exception given existing id', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileRepository.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, 'existing-username', null, []));

            try {
                await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('id already exist');
            }

        });

        it('should not throw exception given non-existing id', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'non-existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

        });
    });

    describe('list', () => {

        let baseRepository: BaseRepository = null;
        let profileRepository: ProfileRepository = null;
        let userRepository: UserRepository = null;

        let profileService: ProfileService = null;
        let userService: UserService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            profileRepository = new ProfileRepository(null, null, null);
            userRepository = new UserRepository(null, null, null);

            await baseRepository.sync();

            profileService = new ProfileService(profileRepository, userRepository);
            userService = new UserService(userRepository);

        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
            profileRepository = null;
            userRepository = null;

            profileService = null;
            userService = null;

        });

        it('should throw exception given non-existing username', async () => {

            try {
                await profileService.list('non-existing-username');
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('username does not exist');
            }

        });

        it('should not throw exception given existing username', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileService.list('existing-username');

        });
    });

    describe('update', () => {

        let baseRepository: BaseRepository = null;
        let profileRepository: ProfileRepository = null;
        let userRepository: UserRepository = null;

        let profileService: ProfileService = null;
        let userService: UserService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            profileRepository = new ProfileRepository(null, null, null);
            userRepository = new UserRepository(null, null, null);

            await baseRepository.sync();

            profileService = new ProfileService(profileRepository, userRepository);
            userService = new UserService(userRepository);

        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
            profileRepository = null;
            userRepository = null;

            profileService = null;
            userService = null;

        });

        it('should throw exception given non-existing id', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileRepository.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, 'existing-username', null, []));

            try {
                await profileService.update(new Profile(null, null, null, null, [], null, null, null, 'non-existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('id does not exist');
            }

        });

        it('should throw exception given non-existing username', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileRepository.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, 'existing-username', null, []));

            try {
                await profileService.update(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'non-existing-username');
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('username does not exist');
            }

        });

        it('should throw exception given mismatched username', async () => {

            await userService.create(new User('existing-username', 'correct-password'));
            await userService.create(new User('mismatched-username', 'correct-password'));

            await profileRepository.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, 'existing-username', null, []));

            try {
                await profileService.update(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'mismatched-username');
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('mismatched username');
            }

        });

        it('should return profile', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileRepository.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, 'existing-username', null, []));

            const profile: Profile = await profileService.update(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

            expect(profile).to.be.not.null;

        });

        it('should update about', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileRepository.create(new Profile('about', null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, 'existing-username', null, []));

            const profile: Profile = await profileService.update(new Profile('updated-about', null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

            expect(profile.about).to.be.eq('updated-about');

        });

        it('should update address', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileRepository.create(new Profile(null, 'address', null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, 'existing-username', null, []));

            const profile: Profile = await profileService.update(new Profile(null, 'updated-address', null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

            expect(profile.address).to.be.eq('updated-address');

        });
    });

});
