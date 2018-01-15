import * as Sequelize from 'sequelize';

export class BaseRepository {
    protected static models: {
        Education: Sequelize.Model<{}, {}>,
        PortfolioItem: Sequelize.Model<{}, {}>,
        Profile: Sequelize.Model<{}, {}>,
        Skill: Sequelize.Model<{}, {}>,
        WorkExperience: Sequelize.Model<{}, {}>,
    } = null;

    protected static sequelize: Sequelize.Sequelize = null;

    private static defineModels(): void {

        const Education = BaseRepository.sequelize.define('education', {
            description: {
                allowNull: true,
                type: Sequelize.STRING,
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

        const PortfolioItem = BaseRepository.sequelize.define('portfolioItem', {
            description: {
                allowNull: true,
                type: Sequelize.STRING,
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
            address: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            birthDate: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            contactNumber: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            emailAddress: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            firstName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            googlePlusLink: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            key: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            lastName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            linkedInLink: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            message: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            twitterLink: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            type: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            website: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const Skill = BaseRepository.sequelize.define('skill', {
            description: {
                allowNull: true,
                type: Sequelize.STRING,
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
                type: Sequelize.STRING,
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

        Profile.hasMany(Education, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        Education.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        Profile.hasMany(PortfolioItem, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        PortfolioItem.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        Profile.hasMany(Skill, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        Skill.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        Profile.hasMany(WorkExperience, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        WorkExperience.belongsTo(Profile, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        this.models = {
            Education,
            PortfolioItem,
            Profile,
            Skill,
            WorkExperience,
        };
    }

    constructor(private host: string, private username: string, private password: string) {

        if (!BaseRepository.sequelize) {
            // BaseRepository.sequelize = new Sequelize('octo-profile-service', username, password, {
            //     dialect: 'postgres',
            //     host,
            //     logging: false,
            //     pool: {
            //         idle: 10000,
            //         max: 5,
            //         min: 0,
            //     },
            // });

            BaseRepository.sequelize = new Sequelize(null, null, null, {
                dialect: 'sqlite',
                storage: 'octo-profile.sqlite',
            });

            BaseRepository.defineModels();
        }
    }

    public close(): void {
        BaseRepository.sequelize.close();
    }

    public sync(): Promise<void> {
        return new Promise((resolve, reject) => {
            BaseRepository.sequelize.sync({ force: true }).then(() => {
                resolve();
            });
        });
    }
}
