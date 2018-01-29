import { IValidator } from './validator';

export interface IStringValidator extends IValidator<string> {

    validate(value: string): boolean;

}
