import { Education } from '../../entities/education';
import { PortfolioItem } from '../../entities/portfolio-item';
import { Profile } from '../../entities/profile';
import { Skill } from '../../entities/skill';
import { WorkExperience } from '../../entities/work-experience';
import { IProfileRepository } from './../profile';
import { BaseRepository } from './base';

export class ProfileRepository extends BaseRepository implements IProfileRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public async create(profile: Profile): Promise<Profile> {

        const user: any = await BaseRepository.models.User.find({
            where: {
                userName: profile.userName,
            },
        });

        const result: any = await BaseRepository.models.Profile.create({
            about: profile.about,
            address: profile.address,
            birthDate: profile.birthDate,
            contactNumber: profile.contactNumber,
            education: profile.education,
            emailAddress: profile.emailAddress,
            firstName: profile.firstName,
            googlePlusLink: profile.googlePlusLink,
            image: profile.image,
            key: profile.id,
            lastName: profile.lastName,
            linkedInLink: profile.linkedInLink,
            message: profile.message,
            portfolioItems: profile.portfolio,
            skills: profile.skills,
            twitterLink: profile.twitterLink,
            type: profile.type,
            userId: user.id,
            website: profile.website,
            workExperiences: profile.workExperiences,
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
                    model: BaseRepository.models.User,
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
            profile.user.username,
            profile.website,
            profile.workExperiences.map((workExperience) => new WorkExperience(workExperience.companyName, workExperience.currentlyEmployed, workExperience.description, workExperience.from, workExperience.location, workExperience.position, workExperience.to)),
        );
    }

    public async list(userName: string): Promise<Profile[]> {

        const user: any = await BaseRepository.models.User.find({
            where: {
                userName,
            },
        });

        const profiles: any[] = await BaseRepository.models.Profile.findAll({
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
                    model: BaseRepository.models.User,
                },
                {
                    model: BaseRepository.models.WorkExperience,
                },
            ],
            where: {
                userId: user.id,
            },
        });

        return profiles.map((profile) => new Profile(
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
            profile.user.username,
            profile.website,
            profile.workExperiences.map((workExperience) => new WorkExperience(workExperience.companyName, workExperience.currentlyEmployed, workExperience.description, workExperience.from, workExperience.location, workExperience.position, workExperience.to)),
        ));
    }

    public async update(profile: Profile): Promise<Profile> {

        const existingProfile: any = await BaseRepository.models.Profile.find({
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
                key: profile.id,
            },
        });

        if (!existingProfile) {
            return null;
        }

        for (const education of existingProfile.education) {
            await BaseRepository.models.Education.destroy({
                where: {
                    id: education.id,
                },
            });
        }

        for (const item of existingProfile.portfolioItems) {
            await BaseRepository.models.PortfolioItem.destroy({
                where: {
                    id: item.id,
                },
            });
        }

        for (const skill of existingProfile.skills) {
            await BaseRepository.models.Skill.destroy({
                where: {
                    id: skill.id,
                },
            });
        }

        for (const workExperience of existingProfile.workExperiences) {
            await BaseRepository.models.WorkExperience.destroy({
                where: {
                    id: workExperience.id,
                },
            });
        }

        existingProfile.about = profile.about;
        existingProfile.address = profile.address;
        existingProfile.birthDate = profile.birthDate;
        existingProfile.contactNumber = profile.contactNumber;
        existingProfile.emailAddress = profile.emailAddress;
        existingProfile.firstName = profile.firstName;
        existingProfile.googlePlusLink = profile.googlePlusLink;
        existingProfile.image = profile.image;
        existingProfile.lastName = profile.lastName;
        existingProfile.linkedInLink = profile.linkedInLink;
        existingProfile.message = profile.message;
        existingProfile.twitterLink = profile.twitterLink;
        existingProfile.type = profile.type;
        existingProfile.website = profile.website;

        for (const education of profile.education) {
            await BaseRepository.models.Education.create({
                education: education.description,
                from: education.from,
                institutionName: education.institutionName,
                profileId: existingProfile.id,
                qualification: education.qualification,
                to: education.to,
            });
        }

        for (const item of profile.portfolio) {
            await BaseRepository.models.PortfolioItem.create({
                description: item.description,
                image: item.image,
                link: item.link,
                name: item.name,
                profileId: existingProfile.id,
            });
        }

        for (const skill of profile.skills) {
            await BaseRepository.models.Skill.create({
                description: skill.description,
                level: skill.level,
                name: skill.name,
                profileId: existingProfile.id,
                years: skill.years,
            });
        }

        for (const workExperience of profile.workExperiences) {
            await BaseRepository.models.WorkExperience.create({
                companyName: workExperience.companyName,
                currentlyEmployed: workExperience.currentlyEmployed,
                description: workExperience.description,
                from: workExperience.from,
                location: workExperience.location,
                position: workExperience.position,
                profileId: existingProfile.id,
                to: workExperience.to,
            });
        }

        await existingProfile.save();

        return this.find(existingProfile.key);
    }
}
