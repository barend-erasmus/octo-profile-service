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
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });

        const PortfolioItem = BaseRepository.sequelize.define('portfolioItem', {
            choicesOrder: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const Profile = BaseRepository.sequelize.define('profile', {
            completeText: {
                allowNull: true,
                type: Sequelize.STRING,
            },
        });

        const Skill = BaseRepository.sequelize.define('skill', {
            order: {
                allowNull: false,
                type: Sequelize.NUMERIC,
            },
        });

        const WorkExperience = BaseRepository.sequelize.define('workExperience', {
            profileId: {
                allowNull: false,
                type: Sequelize.STRING,
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
