import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { Profile } from '../entities/profile';
import { IProfileExceptionHelper } from '../interfaces/profile-exception-helper';
import { IProfileValidator } from '../interfaces/profile-validator';
import { IUserExceptionHelper } from '../interfaces/user-exception-helper';
import { IProfileRepository } from '../repositories/profile';
import { IUserRepository } from '../repositories/user';
import { ProfileService } from './profile';

describe('ProfileService', () => {

    describe('create', () => {

        let profileExceptionHelper: IProfileExceptionHelper = null;
        let profileRepository: IProfileRepository = null;
        let profileValidator: IProfileValidator = null;
        let userExceptionHelper: IUserExceptionHelper = null;
        let userRepository: IUserRepository = null;

        let profileService: ProfileService = null;

        beforeEach(async () => {

            profileExceptionHelper = {
                throwIfProfileExist: (id: string) => null,
            } as IProfileExceptionHelper;

            profileRepository = {
                create: (profile: Profile) => null,
                find: (id: string) => null,
            } as IProfileRepository;

            profileValidator = {
                getValidationMessages: (profile: Profile) => [],
            } as IProfileValidator;

            userExceptionHelper = {
                throwIfUserNotExist: (userName: string) => null,
            } as IUserExceptionHelper;

            userRepository = {} as IUserRepository;

            profileService = new ProfileService(profileExceptionHelper, profileRepository, profileValidator, userExceptionHelper, userRepository);
        });

        afterEach(async () => {
            profileExceptionHelper = null;
            profileRepository = null;

            userExceptionHelper = null;
            userRepository = null;

            profileService = null;
        });

        it('should call setUserName of profile', async () => {
            const profile: Profile = Profile.empty();

            const setUserNameSpy: sinon.SinonSpy = sinon.spy(profile, 'setUserName');

            await profileService.create(profile, 'userName');

            expect(setUserNameSpy.calledOnce).to.be.true;
        });

        it('should call throwIfProfileExist of profileExceptionHelper', async () => {
            const profile: Profile = Profile.empty();

            const throwIfProfileExistSpy: sinon.SinonSpy = sinon.spy(profileExceptionHelper, 'throwIfProfileExist');

            await profileService.create(profile, null);

            expect(throwIfProfileExistSpy.calledOnce).to.be.true;
        });

        it('should call throwIfUserNotExist of userExceptionHelper', async () => {
            const profile: Profile = Profile.empty();

            const throwIfUserNotExistSpy: sinon.SinonSpy = sinon.spy(userExceptionHelper, 'throwIfUserNotExist');

            await profileService.create(profile, null);

            expect(throwIfUserNotExistSpy.calledOnce).to.be.true;
        });

        it('should call create of profileRepository given profile id does not exist', async () => {
            const profile: Profile = Profile.empty();

            const createSpy: sinon.SinonSpy = sinon.spy(profileRepository, 'create');

            await profileService.create(profile, null);

            expect(createSpy.calledOnce).to.be.true;
        });

        it('should not call create of profileRepository given profile is invalid', async () => {
            const profile: Profile = Profile.empty();

            sinon.stub(profileValidator, 'getValidationMessages').callsFake(() => ['invalid something']);

            const createSpy: sinon.SinonSpy = sinon.spy(profileRepository, 'create');

            try {
                await profileService.create(profile, null);
            } catch (err) { }

            expect(createSpy.calledOnce).to.be.false;
        });

        it('should not call create of profileRepository given profile id does exist', async () => {
            const profile: Profile = Profile.empty();

            sinon.stub(profileExceptionHelper, 'throwIfProfileExist').callsFake(() => Promise.reject(null));

            const createSpy: sinon.SinonSpy = sinon.spy(profileRepository, 'create');

            try {
                await profileService.create(profile, null);
            } catch (err) { }

            expect(createSpy.calledOnce).to.be.false;
        });

        it('should not call create of profileRepository given username not does exist', async () => {
            const profile: Profile = Profile.empty();

            sinon.stub(userExceptionHelper, 'throwIfUserNotExist').callsFake(() => Promise.reject(null));

            const createSpy: sinon.SinonSpy = sinon.spy(profileRepository, 'create');

            try {
                await profileService.create(profile, null);
            } catch (err) { }

            expect(createSpy.calledOnce).to.be.false;
        });
    });
});
