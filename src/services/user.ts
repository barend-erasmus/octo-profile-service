import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { User } from '../entities/user';
import { ValidationError } from '../errors/validation-error';
import { IHashStrategy } from '../interfaces/hash-strategy';
import { IUserExceptionHelper } from '../interfaces/user-exception-helper';
import { IUserValidator } from '../interfaces/user-validator';
import { ValidationMessage } from '../models/validation-message';
import { IUserRepository } from '../repositories/user';

@injectable()
export class UserService {

    constructor(
        @inject('IHashStrategy')
        private hashStrategy: IHashStrategy,
        @inject('IUserExceptionHelper')
        private userExceptionHelper: IUserExceptionHelper,
        @inject('IUserRepository')
        private userRepository: IUserRepository,
        @inject('IUserValidator')
        private userValidator: IUserValidator,
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

        this.throwIfUserInvalid(user);

        await this.userExceptionHelper.throwIfUserExist(user.userName);

        const hashedPassword: string = this.hashStrategy.hash(user.password);

        user.setPassword(hashedPassword);

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

    private throwIfUserInvalid(user: User): void {
        const validationMessages: ValidationMessage[] = this.userValidator.getValidationMessages(user);

        if (validationMessages.length !== 0) {
            throw new ValidationError('User is invalid', validationMessages);
        }
    }
}
