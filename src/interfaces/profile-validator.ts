import "reflect-metadata";
import { injectable } from "inversify";
import { Profile } from '../entities/profile';
import { IValidator } from './validator';

export interface IProfileValidator extends IValidator<Profile> {

    validate(value: Profile): boolean;

    getValidationMessages(value: Profile): string[];
}
