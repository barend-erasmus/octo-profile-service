import { User } from '../entities/user';

export interface IUserRepository {
    create(user: User): Promise<User>;
    find(userName: string): Promise<User>;
}
