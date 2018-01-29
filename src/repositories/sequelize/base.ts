import * as Sequelize from 'sequelize';

export class BaseRepository {
    protected static models: {
        Address: Sequelize.Model<{}, {}>,
        ContactInformation: Sequelize.Model<{}, {}>,
        Education: Sequelize.Model<{}, {}>,
        PersonalInformation: Sequelize.Model<{}, {}>,
        PortfolioItem: Sequelize.Model<{}, {}>,
        Profile: Sequelize.Model<{}, {}>,
        Skill: Sequelize.Model<{}, {}>,
        SocialInformation: Sequelize.Model<{}, {}>,
        Usage: Sequelize.Model<{}, {}>,
        User: Sequelize.Model<{}, {}>,
        WorkExperience: Sequelize.Model<{}, {}>,
    } = null;

    protected static sequelize: Sequelize.Sequelize = null;

    private static defineModels(): void {

        const Address = BaseRepository.sequelize.define('address', {
            city: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            country: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            line1: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            line2: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            postalCode: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const ContactInformation = BaseRepository.sequelize.define('contactInformation', {
            contactNumber: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            emailAddress: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const Education = BaseRepository.sequelize.define('education', {
            description: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            from: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            institutionName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            qualification: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            to: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });


        const PersonalInformation = BaseRepository.sequelize.define('personalInformation', {
            birthDate: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            firstName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            lastName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const PortfolioItem = BaseRepository.sequelize.define('portfolioItem', {
            description: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            image: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            link: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const Profile = BaseRepository.sequelize.define('profile', {
            about: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            key: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            message: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            type: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const Skill = BaseRepository.sequelize.define('skill', {
            description: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            level: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            years: {
                allowNull: true,
                type: Sequelize.NUMERIC,
            },
        });

        const SocialInformation = BaseRepository.sequelize.define('socialInformation', {
            googlePlusLink: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            linkedInLink: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            twitterLink: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            website: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const Usage = BaseRepository.sequelize.define('usage', {
            firstTime: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            ipAddress: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            profileId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            referer: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            timestamp: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });

        const User = BaseRepository.sequelize.define('user', {
            password: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            userName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const WorkExperience = BaseRepository.sequelize.define('workExperience', {
            companyName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            currentlyEmployed: {
                allowNull: true,
                type: Sequelize.BOOLEAN,
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            from: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            location: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            position: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            to: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });

        ContactInformation.hasOne(Address, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        Address.belongsTo(ContactInformation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        Profile.hasOne(ContactInformation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        ContactInformation.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        Profile.hasMany(Education, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        Education.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        Profile.hasOne(PersonalInformation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        PersonalInformation.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
       
        Profile.hasMany(PortfolioItem, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        PortfolioItem.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        Profile.hasMany(Skill, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        Skill.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        Profile.hasOne(SocialInformation, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        SocialInformation.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        Profile.hasMany(WorkExperience, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        WorkExperience.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        User.hasMany(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        Profile.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        this.models = {
            Address,
            ContactInformation,
            Education,
            PersonalInformation,
            PortfolioItem,
            Profile,
            Skill,
            SocialInformation,
            Usage,
            User,
            WorkExperience,
        };
    }

    constructor(private host: string, private userName: string, private password: string) {

        if (!BaseRepository.sequelize) {

            if (!host && !userName && !password) {

                BaseRepository.sequelize = new Sequelize(null, null, null, {
                    dialect: 'sqlite',
                    logging: false,
                });
            } else {
                BaseRepository.sequelize = new Sequelize('octo-profile-service', userName, password, {
                    dialect: 'postgres',
                    host,
                    logging: false,
                    pool: {
                        idle: 10000,
                        max: 5,
                        min: 0,
                    },
                });
            }

            BaseRepository.defineModels();
        }
    }

    public close(): void {
        BaseRepository.sequelize.close();
    }

    public sync(force: boolean = true): Promise<void> {
        return new Promise((resolve, reject) => {
            BaseRepository.sequelize.sync({ force }).then(() => {
                resolve();
            });
        });
    }
}
