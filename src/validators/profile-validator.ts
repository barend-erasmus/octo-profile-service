import { ContactInformation } from '../entities/contact-infomation';
import { Profile } from '../entities/profile';
import { IProfileValidator } from '../interfaces/profile-validator';
import { IStringValidator } from '../interfaces/string-validator';

export class ProfileValidator implements IProfileValidator {

    constructor(
        private emailAddressValidator: IStringValidator,
    ) {

    }

    public validate(value: Profile): boolean {
        return this.getValidationMessages(value).length === 0;
    }

    public  getValidationMessages(value: Profile): string[] {
        const messages: string[] = [];

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
    
        return [];
    }
}
