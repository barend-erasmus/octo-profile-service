import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { IProfileRepository } from '../repositories/profile';
import { ProfileService } from './profile';
import { IUserRepository } from '../repositories/user';
import { Profile } from '../entities/profile';
import { IProfileExceptionHelper } from '../interfaces/profile-exception-helper';
import { IUserExceptionHelper } from '../interfaces/user-exception-helper';

describe('ProfileService', () => {

    describe('create', () => {

        let profileExceptionHelper: IProfileExceptionHelper = null;
        let profileRepository: IProfileRepository = null;
        let userExceptionHelper: IUserExceptionHelper = null;
        let userRepository: IUserRepository = null;

        let profileService: ProfileService = null;

        beforeEach(async () => {

            profileExceptionHelper = <IProfileExceptionHelper>{
                throwIfProfileExist: (id: string) => null,
            };

            profileRepository = <IProfileRepository>{
                create: (profile: Profile) => null,
                find: (id: string) => null,
            };

            userExceptionHelper = <IUserExceptionHelper>{
                throwIfUserNotExist: (userName: string) => null,
            };

            userRepository = <IUserRepository>{};

            profileService = new ProfileService(profileExceptionHelper, profileRepository, userExceptionHelper, userRepository);
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
    });
});
