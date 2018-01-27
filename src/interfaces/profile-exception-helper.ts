import { IExceptionHelper } from "./exception-helper";
import { Profile } from "../entities/profile";

export interface IProfileExceptionHelper extends IExceptionHelper<Profile> {
    throwIfProfileExist(id: string): Promise<void>;
    throwIfProfileNotExist(id: string): Promise<Profile>;
}