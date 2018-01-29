import { User } from '../entities/user';
import { IValidator } from './validator';
import { ValidationMessage } from '../models/validation-message';

export interface IUserValidator extends IValidator<User> {

    validate(value: User): boolean;

    getValidationMessages(value: User): ValidationMessage[];
    
}
