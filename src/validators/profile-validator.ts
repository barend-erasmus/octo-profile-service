import "reflect-metadata";
import { injectable, inject } from "inversify";
import { ContactInformation } from '../entities/contact-infomation';
import { Profile } from '../entities/profile';
import { IProfileValidator } from '../interfaces/profile-validator';
import { IStringValidator } from '../interfaces/string-validator';

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

    public  getValidationMessages(value: Profile): string[] {
        const messages: string[] = [];

        messages.concat(this.getValidationMessagesForContactInformation(value.contactInformation));

        if (!value.about) {
            messages.push('About is required');
        }

        if (!value.message) {
            messages.push('Message is required');
        }

        return messages;
    }

    private getValidationMessagesForContactInformation(contactInformation: ContactInformation): string[] {

        const messages: string[] = [];

        if (!contactInformation) {
            messages.push('Contact Information is required');
            return messages;
        }

        if (!contactInformation.contactNumber) {
            messages.push('Contact Number is required');
        }

        if (!contactInformation.emailAddress) {
            messages.push('Email Address is required');
        } else if (!this.emailAddressValidator.validate(contactInformation.emailAddress)) {
            messages.push('Email Address is invalid');
        }

        return messages;
    }
}
