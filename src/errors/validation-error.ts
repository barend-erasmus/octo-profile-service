export class ValidationError extends Error {
    constructor(
        message: string,
        detailedMessages: string[],
    ) {
        super(message);
    }
}