import * as express from 'express';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { ExceptionHelper } from '../helpers/exception-helper';
import { IHashStrategy } from '../interfaces/hash-strategy';
import { IUserExceptionHelper } from '../interfaces/user-exception-helper';
import { BaseRepository } from '../repositories/sequelize/base';
import { UsageRepository } from '../repositories/sequelize/usage';
import { UserRepository } from '../repositories/sequelize/user';
import { UsageService } from '../services/usage';
import { UserService } from '../services/user';
import { MD5HashStrategy } from '../strategies/md5-hash-strategy';
import { config } from './../config';
import { ProfileRepository } from './../repositories/sequelize/profile';
import { ProfileService } from './../services/profile';
import { IProfileValidator } from '../interfaces/profile-validator';
import { ProfileValidator } from '../validators/profile-validator';
import { EmailAddressValidator } from '../validators/email-address-validator';
import { IUserValidator } from '../interfaces/user-validator';
import { UserValidator } from '../validators/user-validator';

export class BaseRouter {

    public static async sync(req: express.Request, res: express.Response) {
        try {

            await new BaseRepository(config.database.host, config.database.userName, config.database.password).sync(true);

            // let user: User = await BaseRouter.getUserService().find('developersworkspace@gmail.com');

            // if (!user) {
            //     user = await BaseRouter.getUserService().create(new User('developersworkspace@gmail.com', '12345678'));
            //     await BaseRouter.getProfileService().create(Profile.getProfileBarendErasmus(), user.userName);
            // }

            res.json(true);

        } catch (err) {
            res.status(500).json(err);
        }
    }

    public static getProfileService(): ProfileService {

        const profileRepository: ProfileRepository = new ProfileRepository(config.database.host, config.database.userName, config.database.password);
        const userRepository: UserRepository = new UserRepository(config.database.host, config.database.userName, config.database.password);

        const exceptionHelper: ExceptionHelper = new ExceptionHelper(profileRepository, userRepository);

        const profileValidator: IProfileValidator = new ProfileValidator(new EmailAddressValidator());

        const profileService: ProfileService = new ProfileService(exceptionHelper, profileRepository, profileValidator, exceptionHelper, userRepository);

        return profileService;
    }

    public static getUsageService(): UsageService {

        const profileRepository: ProfileRepository = new ProfileRepository(config.database.host, config.database.userName, config.database.password);
        const usageRepository: UsageRepository = new UsageRepository(config.database.host, config.database.userName, config.database.password);

        const usageService: UsageService = new UsageService(usageRepository, profileRepository);

        return usageService;
    }

    public static getUserService(): UserService {

        const userRepository: UserRepository = new UserRepository(config.database.host, config.database.userName, config.database.password);

        const userExceptionHelper: IUserExceptionHelper = new ExceptionHelper(null, userRepository);

        const hashStrategy: IHashStrategy = new MD5HashStrategy();

        const userValidator: IUserValidator = new UserValidator(new EmailAddressValidator());

        const userService: UserService = new UserService(hashStrategy, userExceptionHelper, userRepository, userValidator);

        return userService;
    }
}
