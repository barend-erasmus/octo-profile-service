import { Profile } from '../entities/profile';
import { IValidationStrategy } from './validation-strategy';

export interface IProfileValidationStrategy extends IValidationStrategy<Profile> {

    validate(value: Profile): boolean;

    getValidationMessages(value: Profile): string[];
}
