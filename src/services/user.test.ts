import { expect } from 'chai';
import 'mocha';
import { config } from '../config';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/sequelize/user';
import { BaseRepository } from './../repositories/sequelize/base';
import { UserService } from './user';

describe('UserService', () => {

    describe('authenticate', () => {

        let baseRepository: BaseRepository = null;
        let userRepository: UserRepository = null;

        let userService: UserService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            userRepository = new UserRepository(null, null, null);

            await baseRepository.sync();

            userService = new UserService(userRepository);

        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
            userRepository = null;

            userService = null;

        });

        it('should return false given incorrect password', async () => {

            await userService.create(new User('existing-email-address@example.com', 'correct-password'));

            const result: boolean = await userService.authenticate('existing-email-address@example.com', 'incorrect-password');

            expect(result).to.be.false;

        });

        it('should return true given correct password', async () => {

            await userService.create(new User('existing-email-address@example.com', 'correct-password'));

            const result: boolean = await userService.authenticate('existing-email-address@example.com', 'correct-password');

            expect(result).to.be.true;

        });

        it('should return false given non-existing username', async () => {

            const result: boolean = await userService.authenticate('non-existing-email-address@example.com', 'incorrect-password');

            expect(result).to.be.false;

        });

    });

    describe('create', () => {

        let baseRepository: BaseRepository = null;
        let userRepository: UserRepository = null;

        let userService: UserService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            userRepository = new UserRepository(null, null, null);

            await baseRepository.sync();

            userService = new UserService(userRepository);

        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
            userRepository = null;

            userService = null;

        });

        it('should throw exception given existing username', async () => {

            await userService.create(new User('existing-email-address@example.com', 'correct-password'));

            try {
                await userService.create(new User('existing-email-address@example.com', 'correct-password'));
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('username already exist');
            }

        });

        it('should throw exception given invalid email address', async () => {

            await userService.create(new User('valid-email-address@example.com', 'correct-password'));

            try {
                await userService.create(new User('invalid-email-address', 'correct-password'));
                throw new Error('Expected Error');
            } catch (err) {
                expect(err.message).to.be.eq('invalid email address');
            }

        });

        it('should not throw exception given non-existing username', async () => {

            await userService.create(new User('non-existing-email-address@example.com', 'correct-password'));

        });

        it('should encrypt password', async () => {

            await userService.create(new User('existing-email-address@example.com', 'correct-password'));

            const user: User = await userRepository.find('existing-email-address@example.com');

            expect(user.password).to.be.eq('a7f0f6de027f693b3326791507a0cebe');
        });

        it('should return user with null password', async () => {

            const user: User = await userService.create(new User('existing-email-address@example.com', 'correct-password'));

            expect(user.password).to.be.null;
        });
    });

    describe('find', () => {

        let baseRepository: BaseRepository = null;
        let userRepository: UserRepository = null;

        let userService: UserService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            userRepository = new UserRepository(null, null, null);

            await baseRepository.sync();

            userService = new UserService(userRepository);

        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
            userRepository = null;

            userService = null;

        });

        it('should return null given non-existing username', async () => {

            const user: User = await userService.find('non-existing-email-address@example.com');

            expect(user).to.be.null;

        });

        it('should return user given existing username', async () => {

            await userService.create(new User('existing-email-address@example.com', 'correct-password'));

            const user: User = await userService.find('existing-email-address@example.com');

            expect(user).to.be.not.null;

        });

        it('should return user with null password', async () => {

            await userService.create(new User('existing-email-address@example.com', 'correct-password'));

            const user: User = await userService.find('existing-email-address@example.com');

            expect(user.password).to.be.null;

        });

    });

});
