import * as express from 'express';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { OctoProfileError } from '../errors/octo-profile-error';
import { ExceptionHelper } from '../helpers/exception-helper';
import { IHashStrategy } from '../interfaces/hash-strategy';
import { IProfileValidator } from '../interfaces/profile-validator';
import { IUserExceptionHelper } from '../interfaces/user-exception-helper';
import { IUserValidator } from '../interfaces/user-validator';
import { container } from '../ioc';
import { BaseRepository } from '../repositories/sequelize/base';
import { UsageRepository } from '../repositories/sequelize/usage';
import { UserRepository } from '../repositories/sequelize/user';
import { UsageService } from '../services/usage';
import { UserService } from '../services/user';
import { MD5HashStrategy } from '../strategies/md5-hash-strategy';
import { EmailAddressValidator } from '../validators/email-address-validator';
import { ProfileValidator } from '../validators/profile-validator';
import { UserValidator } from '../validators/user-validator';
import { config } from './../config';
import { ProfileRepository } from './../repositories/sequelize/profile';
import { ProfileService } from './../services/profile';

export class BaseRouter {

    public static async sync(req: express.Request, res: express.Response) {
        try {

            await new BaseRepository(config.database.host, config.database.userName, config.database.password).sync(true);

            let user: User = await BaseRouter.getUserService().find('developersworkspace@gmail.com');

            if (!user) {
                user = await BaseRouter.getUserService().create(new User('developersworkspace@gmail.com', '12345678'));
                await BaseRouter.getProfileService().create(Profile.getProfileBarendErasmus(), user.userName);
            }

            res.json(true);

        } catch (err) {
            res.status(500).json(OctoProfileError.fromError(err));
        }
    }

    public static getProfileService(): ProfileService {

        const profileService: ProfileService = container.get<ProfileService>('ProfileService');

        return profileService;
    }

    public static getUsageService(): UsageService {

        const usageService: UsageService = container.get<UsageService>('UsageService');

        return usageService;
    }

    public static getUserService(): UserService {

        const userService: UserService = container.get<UserService>('UserService');

        return userService;
    }
}
