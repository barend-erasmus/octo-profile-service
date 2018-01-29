import { ContactInformation } from '../entities/contact-infomation';
import { User } from '../entities/user';
import { IStringValidator } from '../interfaces/string-validator';
import { IUserValidator } from '../interfaces/user-validator';

export class UserValidator implements IUserValidator {

    constructor(
        private emailAddressValidator: IStringValidator,
    ) {

    }

    public validate(value: User): boolean {
        return this.getValidationMessages(value).length === 0;
    }

    public  getValidationMessages(value: User): string[] {
        const messages: string[] = [];

        if (!this.emailAddressValidator.validate(value.userName)) {
            messages.push('User Name is invalid');
        }

        return messages;
    }
}
