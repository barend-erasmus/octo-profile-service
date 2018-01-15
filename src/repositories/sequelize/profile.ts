import { IProfileRepository } from './../profile';
import { BaseRepository } from './base';
import { Profile } from '../../entities/profile';

export class ProfileRepository extends BaseRepository implements IProfileRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
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
                id,
            },
        });

        console.log(profile);

        if (!profile) {
            return null;
        }

        return new Profile(
            profile.about,
            profile.address,
            profile.birthDate,
            profile.contactNumber,
            [],
            profile.emailAddress,
            profile.firstName,
            profile.googlePlusLink,
            profile.id,
            profile.image,
            profile.lastName,
            profile.linkedInLink,
            profile.message,
            [],
            [],
            profile.twitterLink,
            profile.type,
            profile.website,
            [],
        );
    }
}
