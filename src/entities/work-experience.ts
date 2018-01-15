export class WorkExperience {
    constructor(
        public companyName: string,
        public currentlyEmployed: boolean,
        public description: string,
        public from: Date,
        public location: string,
        public position: string,
        public to: Date,
    ) {

    }
}
