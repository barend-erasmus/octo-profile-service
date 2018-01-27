import { IProfileExceptionHelper } from "../interfaces/profile-exception-helper";
import { IUserExceptionHelper } from "../interfaces/user-exception-helper";
import { IProfileRepository } from "../repositories/profile";
import { IUserRepository } from "../repositories/user";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";

export class ExceptionHelper implements IProfileExceptionHelper, IUserExceptionHelper {

    constructor(
        private profileRepository: IProfileRepository,
        private userRepository: IUserRepository,
    ) {

    }

    public async throwIfProfileExist(id: string): Promise<void> {
        const profile: Profile = await this.profileRepository.find(id);

        if (profile == null) {
            throw new Error('Profile already exist');
        }
    }

    public async throwIfProfileNotExist(id: string): Promise<Profile> {
        const profile: Profile = await this.profileRepository.find(id);

        if (!profile) {
            throw new Error('Profile does not exist');
        }

        return profile;
    }

    public throwIfUserNameMismatch(user: User, profile: Profile): void {
        if (user.userName !== profile.userName) {
            throw new Error('Mismatched UserName');
        }
    }

    public async throwIfUserExist(userName: string): Promise<void> {
        const user: User = await this.userRepository.find(userName);

        if (user) {
            throw new Error('UserName already exist');
        }
    }

    public async throwIfUserNotExist(userName: string): Promise<User> {
        const user: User = await this.userRepository.find(userName);

        if (!user) {
            throw new Error('UserName does not exist');
        }

        return user;
    }
}