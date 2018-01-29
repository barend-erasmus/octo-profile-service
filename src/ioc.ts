import "reflect-metadata";
import { Container } from "inversify";
import { EmailAddressValidator } from './validators/email-address-validator';
import { ProfileValidator } from "./validators/profile-validator";
import { IProfileValidator } from "./interfaces/profile-validator";
import { MD5HashStrategy } from "./strategies/md5-hash-strategy";
import { IHashStrategy } from "./interfaces/hash-strategy";
import { IProfileExceptionHelper } from "./interfaces/profile-exception-helper";
import { IUserExceptionHelper } from "./interfaces/user-exception-helper";
import { ExceptionHelper } from "./helpers/exception-helper";
import { IUserValidator } from "./interfaces/user-validator";
import { UserValidator } from "./validators/user-validator";
import { IUsageRepository } from "./repositories/usage";
import { IProfileRepository } from "./repositories/profile";
import { ProfileRepository } from "./repositories/sequelize/profile";
import { config } from "./config";
import { UsageRepository } from "./repositories/sequelize/usage";
import { UserRepository } from "./repositories/sequelize/user";
import { IUserRepository } from "./repositories/user";
import { ProfileService } from "./services/profile";
import { UsageService } from "./services/usage";
import { UserService } from "./services/user";

const container: Container = new Container();

container.bind<EmailAddressValidator>("EmailAddressValidator").to(EmailAddressValidator);

container.bind<IHashStrategy>("IHashStrategy").to(MD5HashStrategy);
container.bind<IProfileExceptionHelper>("IProfileExceptionHelper").to(ExceptionHelper);
container.bind<IProfileValidator>("IProfileValidator").to(ProfileValidator);
container.bind<IUserExceptionHelper>("IUserExceptionHelper").to(ExceptionHelper);
container.bind<IUserValidator>("IUserValidator").to(UserValidator);

container.bind<IProfileRepository>("IProfileRepository").toConstantValue(new ProfileRepository(config.database.host, config.database.userName, config.database.password));
container.bind<IUsageRepository>("IUsageRepository").toConstantValue(new UsageRepository(config.database.host, config.database.userName, config.database.password));
container.bind<IUserRepository>("IUserRepository").toConstantValue(new UserRepository(config.database.host, config.database.userName, config.database.password));

container.bind<ProfileService>("ProfileService").to(ProfileService);
container.bind<UsageService>("UsageService").to(UsageService);
container.bind<UserService>("UserService").to(UserService);

export {
    container,
};