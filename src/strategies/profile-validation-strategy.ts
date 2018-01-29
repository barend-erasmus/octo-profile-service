import { ContactInformation } from '../entities/contact-infomation';
import { Profile } from '../entities/profile';
import { IProfileValidationStrategy } from '../interfaces/profile-validation-strategy';

export class ProfileValidationStrategy implements IProfileValidationStrategy {

    public validate(value: Profile): boolean {
        return this.getValidationMessages(value).length === 0;
    }

    public  getValidationMessages(value: Profile): string[] {
        const messages: string[] = [];

        return messages;
    }

    private getValidationMessagesForContactInformation(contactInformation: ContactInformation): string[] {
        return [];
    }
}
