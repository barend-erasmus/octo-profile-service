export class CustomError extends Error {
    constructor(
        public commonMessage: string,
    ) {
        super(commonMessage);
    }

    public static fromError(err: Error): CustomError {
        return new CustomError(err.message);
    }
}
