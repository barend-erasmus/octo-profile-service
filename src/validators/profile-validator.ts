import "reflect-metadata";
import { injectable, inject } from "inversify";
import { ContactInformation } from '../entities/contact-infomation';
import { Profile } from '../entities/profile';
import { IProfileValidator } from '../interfaces/profile-validator';
import { IStringValidator } from '../interfaces/string-validator';
import { ValidationMessage } from "../models/validation-message";

@injectable()
export class ProfileValidator implements IProfileValidator {

    constructor(
        @inject("EmailAddressValidator")
        private emailAddressValidator: IStringValidator,
    ) {

    }

    public validate(value: Profile): boolean {
        return this.getValidationMessages(value).length === 0;
    }

    public  getValidationMessages(value: Profile): ValidationMessage[] {
        const messages: ValidationMessage[] = [];

        messages.concat(this.getValidationMessagesForContactInformation(value.contactInformation));

        if (!value.about) {
            messages.push(new ValidationMessage('profile.about', 'About is required'));
        }

        if (!value.message) {
            messages.push(new ValidationMessage('profile.message', 'Message is required'));
        }

        return messages;
    }

    private getValidationMessagesForContactInformation(contactInformation: ContactInformation): ValidationMessage[] {

        const messages: ValidationMessage[] = [];

        if (!contactInformation) {
            messages.push(new ValidationMessage('profile.contactInformation', 'Contact Information is required'));
            return messages;
        }

        if (!contactInformation.contactNumber) {
            messages.push(new ValidationMessage('profile.contactInformation.contactNumber', 'Contact Number is required'));
        }

        if (!contactInformation.emailAddress) {
            messages.push(new ValidationMessage('profile.contactInformation.emailAddress', 'Email Address is required'));
        } else if (!this.emailAddressValidator.validate(contactInformation.emailAddress)) {
            messages.push(new ValidationMessage('profile.contactInformation.emailAddress', 'Email Address is invalid'));
        }

        return messages;
    }
}
