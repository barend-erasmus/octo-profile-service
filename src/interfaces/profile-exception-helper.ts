import { Profile } from '../entities/profile';
import { IExceptionHelper } from './exception-helper';

export interface IProfileExceptionHelper extends IExceptionHelper<Profile> {
    throwIfProfileExist(id: string): Promise<void>;
    throwIfProfileNotExist(id: string): Promise<Profile>;
}
