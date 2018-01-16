import { WorkExperience } from './work-experience';
import { Education } from './education';
import { Skill } from './skill';
import { PortfolioItem } from './portfolio-item';

export class Profile {
    constructor(
        public about: string,
        public address: string,
        public birthDate: Date,
        public contactNumber: string,
        public education: Education[],
        public emailAddress: string,
        public firstName: string,
        public googlePlusLink: string,
        public id: string,
        public image: string,
        public lastName: string,
        public linkedInLink: string,
        public message: string,
        public portfolio: PortfolioItem[],
        public skills: Skill[],
        public twitterLink: string,
        public type: string,
        public username: string,
        public website: string,
        public workExperiences: WorkExperience[],
    ) {

    }
}
