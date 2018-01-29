import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { ValidationError } from '../errors/validation-error';
import { IProfileExceptionHelper } from '../interfaces/profile-exception-helper';
import { IUserExceptionHelper } from '../interfaces/user-exception-helper';
import { IProfileRepository } from '../repositories/profile';
import { IUserRepository } from '../repositories/user';

@injectable()
export class ExceptionHelper implements IProfileExceptionHelper, IUserExceptionHelper {

    constructor(
        @inject('IProfileRepository')
        private profileRepository: IProfileRepository,
        @inject('IUserRepository')
        private userRepository: IUserRepository,
    ) {

    }

    public async throwIfProfileExist(id: string): Promise<void> {
        const profile: Profile = await this.profileRepository.find(id);

        if (profile) {
            throw new ValidationError('Profile already exist', null);
        }
    }

    public async throwIfProfileNotExist(id: string): Promise<Profile> {
        const profile: Profile = await this.profileRepository.find(id);

        if (!profile) {
            throw new ValidationError('Profile does not exist', null);
        }

        return profile;
    }

    public throwIfUserNameMismatch(user: User, profile: Profile): void {
        if (user.userName !== profile.userName) {
            throw new ValidationError('Mismatched UserName', null);
        }
    }

    public async throwIfUserExist(userName: string): Promise<void> {
        const user: User = await this.userRepository.find(userName);

        if (user) {
            throw new ValidationError('UserName already exist', null);
        }
    }

    public async throwIfUserNotExist(userName: string): Promise<User> {
        const user: User = await this.userRepository.find(userName);

        if (!user) {
            throw new ValidationError('UserName does not exist', null);
        }

        return user;
    }
}
