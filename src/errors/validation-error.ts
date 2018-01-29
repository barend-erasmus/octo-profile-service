import { ValidationMessage } from "../models/validation-message";

export class ValidationError extends Error {
    constructor(
        public commonMessage: string,
        public validationMessages: ValidationMessage[],
    ) {
        super(commonMessage);
    }
}
