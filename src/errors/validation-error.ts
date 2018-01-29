export class ValidationError extends Error {
    constructor(
        public commonMessage: string,
        public detailedMessages: string[],
    ) {
        super(commonMessage);
    }
}
