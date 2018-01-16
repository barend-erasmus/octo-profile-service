import { BaseRepository } from './base';

import { IUserRepository } from './../user';

import { User } from '../../entities/user';

export class UserRepository extends BaseRepository implements IUserRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public async create(user: User): Promise<User> {

        const result: any = await BaseRepository.models.User.create({
            password: user.password,
            username: user.username,
        }, {
        });

        return user;
    }

    public async find(username: string): Promise<User> {
        const user: any = await BaseRepository.models.User.find({
            where: {
                username,
            },
        });

        if (!user) {
            return null;
        }

        return new User(
            user.username,
            user.password,
        );
    }
}
