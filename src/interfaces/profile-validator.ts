import { injectable } from 'inversify';
import 'reflect-metadata';
import { Profile } from '../entities/profile';
import { ValidationMessage } from '../models/validation-message';
import { IValidator } from './validator';

export interface IProfileValidator extends IValidator<Profile> {

    validate(value: Profile): boolean;

    getValidationMessages(value: Profile): ValidationMessage[];
}
