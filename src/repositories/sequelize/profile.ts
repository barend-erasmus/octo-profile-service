import { IProfileRepository } from './../profile';
import { BaseRepository } from './base';
import { Profile } from '../../entities/profile';
import { Education } from '../../entities/education';
import { PortfolioItem } from '../../entities/portfolio-item';
import { Skill } from '../../entities/skill';
import { WorkExperience } from '../../entities/work-experience';

export class ProfileRepository extends BaseRepository implements IProfileRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public async create(profile: Profile): Promise<Profile> {
        const result: any = await BaseRepository.models.Profile.create({
            about: profile.about,
            address: profile.address,
            birthDate: profile.birthDate,
            contactNumber: profile.contactNumber,
            education: profile.education.map((education) => new Education(education.description, education.from, education.institutionName, education.qualification, education.to)),
            emailAddress: profile.emailAddress,
            firstName: profile.firstName,
            googlePlusLink: profile.googlePlusLink,
            key: profile.id,
            image: profile.image,
            lastName: profile.lastName,
            linkedInLink: profile.linkedInLink,
            message: profile.message,
            portfolioItems: profile.portfolio.map((portfolioItem) => new PortfolioItem(portfolioItem.description, portfolioItem.image, portfolioItem.link, portfolioItem.name)),
            skills: profile.skills.map((skill) => new Skill(skill.description, skill.level, skill.name, skill.years)),
            twitterLink: profile.twitterLink,
            type: profile.type,
            website: profile.website,
            workExperiences: profile.workExperiences.map((workExperience) => new WorkExperience(workExperience.companyName, workExperience.currentlyEmployed, workExperience.description, workExperience.from, workExperience.location, workExperience.position, workExperience.to)),
        }, {
            include: [
                {
                    model: BaseRepository.models.Education,
                },
                {
                    model: BaseRepository.models.PortfolioItem,
                },
                {
                    model: BaseRepository.models.Skill,
                },
                {
                    model: BaseRepository.models.WorkExperience,
                },
            ],
        });

        
        return profile;
    }
    
    public async find(id: string): Promise<Profile> {
        const profile: any = await BaseRepository.models.Profile.find({
            include: [
                {
                    model: BaseRepository.models.Education,
                },
                {
                    model: BaseRepository.models.PortfolioItem,
                },
                {
                    model: BaseRepository.models.Skill,
                },
                {
                    model: BaseRepository.models.WorkExperience,
                },
            ],
            where: {
                key: id,
            },
        });

        if (!profile) {
            return null;
        }

        return new Profile(
            profile.about,
            profile.address,
            profile.birthDate,
            profile.contactNumber,
            profile.education.map((education) => new Education(education.description, education.from, education.institutionName, education.qualification, education.to)),
            profile.emailAddress,
            profile.firstName,
            profile.googlePlusLink,
            profile.key,
            profile.image,
            profile.lastName,
            profile.linkedInLink,
            profile.message,
            profile.portfolioItems.map((portfolioItem) => new PortfolioItem(portfolioItem.description, portfolioItem.image, portfolioItem.link, portfolioItem.name)),
            profile.skills.map((skill) => new Skill(skill.description, skill.level, skill.name, skill.years)),
            profile.twitterLink,
            profile.type,
            profile.website,
            profile.workExperiences.map((workExperience) => new WorkExperience(workExperience.companyName, workExperience.currentlyEmployed, workExperience.description, workExperience.from, workExperience.location, workExperience.position, workExperience.to)),
        );
    }
}
