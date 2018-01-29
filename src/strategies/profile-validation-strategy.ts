import { ContactInformation } from '../entities/contact-infomation';
import { Profile } from '../entities/profile';
import { IProfileValidationStrategy } from '../interfaces/profile-validation-strategy';
import { IStringValidationStrategy } from '../interfaces/string-validation-strategy';

export class ProfileValidationStrategy implements IProfileValidationStrategy {

    constructor(
        private emailAddressValidationStrategy: IStringValidationStrategy,
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
        } else if (!this.emailAddressValidationStrategy.validate(contactInformation.emailAddress)) {
            messages.push('Email Address is invalid');
        }
    
        return [];
    }
}
