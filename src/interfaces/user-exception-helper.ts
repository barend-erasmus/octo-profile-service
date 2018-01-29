import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { IExceptionHelper } from './exception-helper';

export interface IUserExceptionHelper extends IExceptionHelper<User> {

    throwIfUserNameMismatch(user: User, profile: Profile): void;
    throwIfUserExist(userName: string): Promise<void>;
    throwIfUserNotExist(userName: string): Promise<User>;
    
}
