export class Usage {
    constructor(
        public firstTime: boolean,
        public ipAddress: string,
        public profileId: string,
        public referer: string,
        public timestamp: Date,
        public type: string,
    ) {

    }
}
