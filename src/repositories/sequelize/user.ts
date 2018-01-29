import "reflect-metadata";
import { injectable, inject } from "inversify";
import { User } from '../../entities/user';
import { IUserRepository } from './../user';
import { BaseRepository } from './base';

@injectable()
export class UserRepository extends BaseRepository implements IUserRepository {

    constructor(host: string, userName: string, password: string) {
        super(host, userName, password);
    }

    public async create(user: User): Promise<User> {

        const result: any = await BaseRepository.models.User.create({
            password: user.password,
            userName: user.userName,
        }, {
        });

        return user;
    }

    public async find(userName: string): Promise<User> {
        const user: any = await BaseRepository.models.User.find({
            where: {
                userName,
            },
        });

        if (!user) {
            return null;
        }

        return new User(
            user.userName,
            user.password,
        );
    }
}
