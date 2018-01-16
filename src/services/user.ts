import * as crypto from 'crypto';
import { User } from '../entities/user';
import { IUserRepository } from '../repositories/user';
import { config } from './../config';

export class UserService {

    constructor(
        private userRepository: IUserRepository,
    ) {

    }

    public async authenticate(username: string, password: string): Promise<boolean> {

        password = crypto.createHash('md5').update(password).digest('hex');

        const user: User = await this.userRepository.find(username);

        if (!user) {
            return false;
        }

        return user.password === password;

    }

    public async create(user: User): Promise<User> {

        const existingUser: User = await this.userRepository.find(user.username);

        if (existingUser) {
            throw new Error('username already exist');
        }

        user.password = crypto.createHash('md5').update(user.password).digest('hex');

        user = await this.userRepository.create(user);

        user.password = null;

        return user;

    }

    public async find(username: string): Promise<User> {

        const user: User = await this.userRepository.find(username);

        if (user) {
            user.password = null;
        }

        return user;

    }
}
