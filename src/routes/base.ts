import * as express from 'express';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { BaseRepository } from '../repositories/sequelize/base';
import { UsageRepository } from '../repositories/sequelize/usage';
import { UserRepository } from '../repositories/sequelize/user';
import { UsageService } from '../services/usage';
import { UserService } from '../services/user';
import { config } from './../config';
import { ProfileRepository } from './../repositories/sequelize/profile';
import { ProfileService } from './../services/profile';
import { ExceptionHelper } from '../helpers/exception-helper';
import { IUserExceptionHelper } from '../interfaces/user-exception-helper';
import { IHashStrategy } from '../interfaces/hash-strategy';
import { MD5HashStrategy } from '../strategies/md5-hash-strategy';
import { IStringValidationStrategy } from '../interfaces/string-validation-strategy';
import { EmailAddressValidationStrategy } from '../strategies/email-address-validation-strategy';
import { IProfileValidationStrategy } from '../interfaces/profile-validation-strategy';
import { ProfileValidationStrategy } from '../strategies/profile-validation-strategy';

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
            res.status(500).json({
                message: err.message,
                stack: err.stack,
            });
        }
    }

    public static getProfileService(): ProfileService {

        const profileRepository: ProfileRepository = new ProfileRepository(config.database.host, config.database.userName, config.database.password);
        const userRepository: UserRepository = new UserRepository(config.database.host, config.database.userName, config.database.password);

        const exceptionHelper: ExceptionHelper = new ExceptionHelper(profileRepository, userRepository);

        const profileValidationStrategy: IProfileValidationStrategy = new ProfileValidationStrategy();

        const profileService: ProfileService = new ProfileService(exceptionHelper, profileRepository, profileValidationStrategy, exceptionHelper, userRepository);

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

        const emailVallidationStrategy: IStringValidationStrategy = new EmailAddressValidationStrategy();

        const userService: UserService = new UserService(hashStrategy, emailVallidationStrategy, userExceptionHelper, userRepository);

        return userService;
    }
}
