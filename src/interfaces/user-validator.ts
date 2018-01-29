import { User } from '../entities/user';
import { IValidator } from './validator';

export interface IUserValidator extends IValidator<User> {

    validate(value: User): boolean;

    getValidationMessages(value: User): string[];
    
}
