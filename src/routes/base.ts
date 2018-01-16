import * as express from 'express';
import { config } from './../config';

import { UserService } from '../services/user';
import { ProfileService } from './../services/profile';

import { UserRepository } from '../repositories/sequelize/user';
import { ProfileRepository } from './../repositories/sequelize/profile';

export class BaseRouter {

    public static async sync(req: express.Request, res: express.Response) {
        try {

            const profileRepository: ProfileRepository = new ProfileRepository(config.database.host, config.database.username, config.database.password);

            await profileRepository.sync();

            res.json(true);

        } catch (err) {
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            });
        }
    }

    protected static getProfileService(): ProfileService {

        const profileRepository: ProfileRepository = new ProfileRepository(config.database.host, config.database.username, config.database.password);
        const userRepository: UserRepository = new UserRepository(config.database.host, config.database.username, config.database.password);

        const profileService: ProfileService = new ProfileService(profileRepository, userRepository);

        return profileService;
    }

    protected static getUserService(): UserService {

        const userRepository: UserRepository = new UserRepository(config.database.host, config.database.username, config.database.password);

        const userService: UserService = new UserService(userRepository);

        return userService;
    }
}
