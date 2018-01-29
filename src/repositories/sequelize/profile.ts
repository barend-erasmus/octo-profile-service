import { Address } from '../../entities/address';
import { ContactInformation } from '../../entities/contact-infomation';
import { Education } from '../../entities/education';
import { PersonalInformation } from '../../entities/personal-information';
import { PortfolioItem } from '../../entities/portfolio-item';
import { Profile } from '../../entities/profile';
import { Skill } from '../../entities/skill';
import { SocialInformation } from '../../entities/social-infomation';
import { WorkExperience } from '../../entities/work-experience';
import { IProfileRepository } from './../profile';
import { BaseRepository } from './base';

export class ProfileRepository extends BaseRepository implements IProfileRepository {

    constructor(host: string, userName: string, password: string) {
        super(host, userName, password);
    }

    public async create(profile: Profile): Promise<Profile> {

        const user: any = await BaseRepository.models.User.find({
            where: {
                userName: profile.userName,
            },
        });

        const result: any = await BaseRepository.models.Profile.create(profile, {
            include: [
                {
                    include: [
                        {
                            model: BaseRepository.models.Address,
                        },
                    ],
                    model: BaseRepository.models.ContactInformation,
                },
                {
                    model: BaseRepository.models.Education,
                },
                {
                    model: BaseRepository.models.PersonalInformation,
                },
                {
                    model: BaseRepository.models.PortfolioItem,
                },
                {
                    model: BaseRepository.models.Skill,
                },
                {
                    model: BaseRepository.models.SocialInformation,
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
                    include: [
                        {
                            model: BaseRepository.models.Address,
                        },
                    ],
                    model: BaseRepository.models.ContactInformation,
                },
                {
                    model: BaseRepository.models.Education,
                },
                {
                    model: BaseRepository.models.PersonalInformation,
                },
                {
                    model: BaseRepository.models.PortfolioItem,
                },
                {
                    model: BaseRepository.models.Skill,
                },
                {
                    model: BaseRepository.models.SocialInformation,
                },
                {
                    model: BaseRepository.models.WorkExperience,
                },
            ],
            where: {
                key: id,
            },
        });

        return this.mapProfile(profile);
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

        return profiles.map((profile) => this.mapProfile(profile));
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
        existingProfile.contactInformation.address.city = profile.contactInformation.address.city;
        existingProfile.contactInformation.address.country = profile.contactInformation.address.country;
        existingProfile.contactInformation.address.line1 = profile.contactInformation.address.line1;
        existingProfile.contactInformation.address.line2 = profile.contactInformation.address.line2;
        existingProfile.contactInformation.address.postalCode = profile.contactInformation.address.postalCode;
        existingProfile.contactInformation.contactNumber = profile.contactInformation.contactNumber;
        existingProfile.contactInformation.emailAddress = profile.contactInformation.emailAddress;
        existingProfile.image = profile.image;
        existingProfile.message = profile.message;
        existingProfile.personalInformation.birthDate = profile.personalInformation.birthDate;
        existingProfile.personalInformation.firstName = profile.personalInformation.firstName;
        existingProfile.personalInformation.lastName = profile.personalInformation.lastName;
        existingProfile.socialInformation.googlePlusLink = profile.socialInformation.googlePlusLink;
        existingProfile.socialInformation.linkedInLink = profile.socialInformation.linkedInLink;
        existingProfile.socialInformation.twitterLink = profile.socialInformation.twitterLink;
        existingProfile.socialInformation.website = profile.socialInformation.website;
        existingProfile.type = profile.type;
        existingProfile.userName = profile.userName;

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

    private mapProfile(profile: any): Profile {
        if (!profile) {
            return null;
        }

        return new Profile(
            profile.key,
            profile.about,
            new ContactInformation(
                new Address(
                    profile.contactInformation.address.city,
                    profile.contactInformation.address.country,
                    profile.contactInformation.address.line1,
                    profile.contactInformation.address.line2,
                    profile.contactInformation.address.postalCode,
                ),
                profile.contactInformation.contactNumber,
                profile.contactInformation.emailAddress,
            ),
            profile.education.map((education) => new Education(education.description, education.from, education.institutionName, education.qualification, education.to)),
            profile.image,
            profile.message,
            new PersonalInformation(
                profile.personalInformation.birthDate,
                profile.personalInformation.firstName,
                profile.personalInformation.lastName,
            ),
            profile.portfolioItems.map((portfolioItem) => new PortfolioItem(portfolioItem.description, portfolioItem.image, portfolioItem.link, portfolioItem.name)),
            profile.skills.map((skill) => new Skill(skill.description, skill.level, skill.name, skill.years)),
            new SocialInformation(
                profile.sociallInformation.googlePlusLink,
                profile.sociallInformation.linkedInLink,
                profile.sociallInformation.twitterLink,
                profile.sociallInformation.website,
            ),
            profile.type,
            profile.user.userName,
            profile.workExperiences.map((workExperience) => new WorkExperience(workExperience.companyName, workExperience.currentlyEmployed, workExperience.description, workExperience.from, workExperience.location, workExperience.position, workExperience.to)),
        );
    }
}
