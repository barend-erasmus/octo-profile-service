import { ValidationMessage } from '../models/validation-message';
import { CustomError } from './custom-error';

export class ValidationError extends CustomError {
    constructor(
        commonMessage: string,
        public validationMessages: ValidationMessage[],
    ) {
        super(commonMessage);
    }
}
