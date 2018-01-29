import { User } from '../entities/user';
import { IHashStrategy } from '../interfaces/hash-strategy';
import { IUserExceptionHelper } from '../interfaces/user-exception-helper';
import { IUserRepository } from '../repositories/user';
import { IStringValidator } from '../interfaces/string-validator';

export class UserService {

    constructor(
        private hashStrategy: IHashStrategy,
        private emailAddressValidator: IStringValidator,
        private userExceptionHelper: IUserExceptionHelper,
        private userRepository: IUserRepository,
    ) {

    }

    public async authenticate(userName: string, password: string): Promise<boolean> {

        const hashedPassword: string = this.hashStrategy.hash(password);

        const user: User = await this.userRepository.find(userName);

        if (!user) {
            return false;
        }

        return user.password === hashedPassword;

    }

    public async create(user: User): Promise<User> {

        await this.userExceptionHelper.throwIfUserExist(user.userName);

        if (!this.emailAddressValidator.validate(user.userName)) {
            throw new Error('Invallid Email Address');
        }

        const hashedPassword: string = this.hashStrategy.hash(user.password);

        user = await this.userRepository.create(user);

        user.clearPassword();

        return user;

    }

    public async find(userName: string): Promise<User> {

        const user: User = await this.userRepository.find(userName);

        if (user) {
            user.clearPassword();
        }

        return user;

    }
}
