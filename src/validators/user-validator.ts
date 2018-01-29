import "reflect-metadata";
import { injectable, inject } from "inversify";
import { ContactInformation } from '../entities/contact-infomation';
import { User } from '../entities/user';
import { IStringValidator } from '../interfaces/string-validator';
import { IUserValidator } from '../interfaces/user-validator';
import { ValidationMessage } from "../models/validation-message";

@injectable()
export class UserValidator implements IUserValidator {

    constructor(
        @inject("EmailAddressValidator")
        private emailAddressValidator: IStringValidator,
    ) {

    }

    public validate(value: User): boolean {
        return this.getValidationMessages(value).length === 0;
    }

    public  getValidationMessages(value: User): ValidationMessage[] {
        const messages: ValidationMessage[] = [];

        if (!this.emailAddressValidator.validate(value.userName)) {
            messages.push(new ValidationMessage('user.userName', 'User Name is invalid'));
        }

        return messages;
    }
}
