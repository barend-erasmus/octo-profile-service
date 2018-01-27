import { IValidationStrategy } from "./validation-strategy";

export interface IStringValidationStrategy extends IValidationStrategy<string> {
    validate(value: string): boolean;
}