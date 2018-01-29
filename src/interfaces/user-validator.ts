import { IValidator } from './validator';
import { User } from '../entities/user';

export interface IUserValidator extends IValidator<User> {

    validate(value: User): boolean;

    getValidationMessages(value: User): string[];
}
