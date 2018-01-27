import { IExceptionHelper } from "./exception-helper";
import { User } from "../entities/user";
import { Profile } from "../entities/profile";

export interface IUserExceptionHelper extends IExceptionHelper<User> {
    throwIfUserNameMismatch(user: User, profile: Profile): void;
    throwIfUserExist(userName: string): Promise<void>;
    throwIfUserNotExist(userName: string): Promise<User>;
}