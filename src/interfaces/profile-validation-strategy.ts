import { IValidationStrategy } from "./validation-strategy";
import { Profile } from "../entities/profile";

export interface IProfileValidationStrategy extends IValidationStrategy<Profile> {
    
    validate(value: Profile): boolean;

    getValidationMessages(value: Profile): string[];
}