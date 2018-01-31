import { ValidationMessage } from '../models/validation-message';
import { OctoProfileError } from './octo-profile-error';

export class ValidationError extends OctoProfileError {
    constructor(
        commonMessage: string,
        public validationMessages: ValidationMessage[],
    ) {
        super(commonMessage);
    }
}
