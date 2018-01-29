import "reflect-metadata";
import { injectable } from "inversify";
import { Profile } from '../entities/profile';
import { IValidator } from './validator';
import { ValidationMessage } from "../models/validation-message";

export interface IProfileValidator extends IValidator<Profile> {

    validate(value: Profile): boolean;

    getValidationMessages(value: Profile): ValidationMessage[];
}
