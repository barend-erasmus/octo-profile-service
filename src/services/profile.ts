import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { WorkExperience } from '../entities/work-experience';
import { ValidationError } from '../errors/validation-error';
import { IProfileExceptionHelper } from '../interfaces/profile-exception-helper';
import { IUserExceptionHelper } from '../interfaces/user-exception-helper';
import { IProfileRepository } from '../repositories/profile';
import { IUserRepository } from '../repositories/user';
import { IProfileValidator } from '../interfaces/profile-validator';

export class ProfileService {

    constructor(
        private profileExceptionHelper: IProfileExceptionHelper,
        private profileRepository: IProfileRepository,
        private profileValidator: IProfileValidator,
        private userExceptionHelper: IUserExceptionHelper,
        private userRepository: IUserRepository,
    ) {

    }

    public compareWorkExperiences(a: WorkExperience, b: WorkExperience): number {
        if (b.from === a.from) {
            return 0;
        }

        if (b.from < a.from) {
            return -1;
        }

        return 1;
    }

    public async create(profile: Profile, userName: string): Promise<Profile> {

        profile.setUserName(userName);

        this.throwIfProfileInvalid(profile);

        await this.profileExceptionHelper.throwIfProfileExist(profile.id);

        await this.userExceptionHelper.throwIfUserNotExist(userName);

        profile = await this.profileRepository.create(profile);

        return profile;

    }

    public async find(id: string): Promise<Profile> {

        const profile: Profile = await this.profileRepository.find(id);

        if (!profile) {
            return null;
        }

        profile.workExperiences = profile.workExperiences.sort(this.compareWorkExperiences);

        return profile;

    }

    public async list(userName: string): Promise<Profile[]> {

        const user: User = await this.userExceptionHelper.throwIfUserNotExist(userName);

        const profiles: Profile[] = await this.profileRepository.list(userName);

        return profiles;

    }

    public async update(profile: Profile, userName: string): Promise<Profile> {

        profile.setUserName(userName);

        const existingProfile = await this.profileExceptionHelper.throwIfProfileNotExist(profile.id);

        const user: User = await this.userExceptionHelper.throwIfUserNotExist(userName);

        this.userExceptionHelper.throwIfUserNameMismatch(user, profile);

        profile = await this.profileRepository.update(profile);

        return profile;

    }

    private throwIfProfileInvalid(profile: Profile): void {
        const validationMessages: string[] = this.profileValidator.getValidationMessages(profile);

        if (validationMessages.length !== 0) {
            throw new ValidationError('Profile is invalid', validationMessages);
        }
    }
}
