import { User } from '../entities/user';

export interface IUserRepository {
    create(user: User): Promise<User>;
    find(username: string): Promise<User>;
}
