export class OctoProfileError extends Error {
    constructor(
        public commonMessage: string,
    ) {
        super(commonMessage);
    }

    public static fromError(err: Error): OctoProfileError {
        return new OctoProfileError(err.message);
    }
}
