import { expect } from 'chai';
import * as express from 'express';
import 'mocha';
import * as sinon from 'sinon';
import { Profile } from '../entities/profile';
import { Usage } from '../entities/usage';
import { User } from '../entities/user';
import { UsageCounts } from '../models/usage-counts';
import { ProfileRepository } from '../repositories/sequelize/profile';
import { UsageRepository } from '../repositories/sequelize/usage';
import { UserRepository } from '../repositories/sequelize/user';
import { BaseRepository } from './../repositories/sequelize/base';
import { ProfileService } from './profile';
import { UsageService } from './usage';
import { UserService } from './user';

describe('UserService', () => {

    describe('counts', () => {

        let baseRepository: BaseRepository = null;
        let profileRepository: ProfileRepository = null;
        let usageRepository: UsageRepository = null;
        let userRepository: UserRepository = null;

        let profileService: ProfileService = null;
        let usageService: UsageService = null;
        let userService: UserService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            profileRepository = new ProfileRepository(null, null, null);
            usageRepository = new UsageRepository(null, null, null);
            userRepository = new UserRepository(null, null, null);

            await baseRepository.sync();

            profileService = new ProfileService(profileRepository, userRepository);
            usageService = new UsageService(usageRepository, profileRepository);
            userService = new UserService(userRepository);

        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
            profileRepository = null;
            usageRepository = null;
            userRepository = null;

            profileService = null;
            usageService = null;
            userService = null;

        });

        it('should return usage counts', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

            await usageService.create({
                cookies: {

                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: UsageCounts = await usageService.counts('existing-id');

            expect(result).to.be.not.null;
        });

        it('should return null given non existing profile id', async () => {

            const result: UsageCounts = await usageService.counts('non-existing-id');

            expect(result).to.be.null;
        });

        it('should return usage counts with referer count', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

            await usageService.create({
                cookies: {

                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: UsageCounts = await usageService.counts('existing-id');

            expect(result.countByReferer).to.be.not.null;
        });

        it('should return usage counts with the correct referer count', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

            await usageService.create({
                cookies: {

                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            await usageService.create({
                cookies: {

                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: UsageCounts = await usageService.counts('existing-id');

            expect(result.countByReferer[0].count).to.be.eq(2);
        });

        it('should return usage counts with first time count', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

            await usageService.create({
                cookies: {

                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: UsageCounts = await usageService.counts('existing-id');

            expect(result.countByFirstTime).to.be.not.null;
        });

        it('should return usage counts with the correct first time count', async () => {

            await userService.create(new User('existing-username', 'correct-password'));

            await profileService.create(new Profile(null, null, null, null, [], null, null, null, 'existing-id', null, null, null, null, [], [], null, null, null, null, []), 'existing-username');

            await usageService.create({
                cookies: {

                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            await usageService.create({
                cookies: {

                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: UsageCounts = await usageService.counts('existing-id');

            expect(result.countByFirstTime.filter((x) => x.firstTime)[0].count).to.be.eq(2);
        });
    });

    describe('create', () => {

        let baseRepository: BaseRepository = null;
        let profileRepository: ProfileRepository = null;
        let usageRepository: UsageRepository = null;

        let usageService: UsageService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            profileRepository = new ProfileRepository(null, null, null);
            usageRepository = new UsageRepository(null, null, null);

            await baseRepository.sync();

            usageService = new UsageService(usageRepository, profileRepository);

        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
            profileRepository = null;
            usageRepository = null;

            usageService = null;

        });

        it('should create usage', async () => {

            await usageService.create({
                cookies: {

                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: Usage[] = await usageService.list('existing-id');

            expect(result.length).to.be.eq(1);

        });

        it('should create usage with firstTime false given lastVisit cookie', async () => {

            await usageService.create({
                cookies: {
                    lastVisit: new Date(),
                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: Usage[] = await usageService.list('existing-id');

            expect(result[0].firstTime).to.be.false;

        });

        it('should create usage with firstTime true given no lastVisit cookie', async () => {

            await usageService.create({
                cookies: {
                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: Usage[] = await usageService.list('existing-id');

            expect(result[0].firstTime).to.be.true;

        });

        it('should create usage with ip address given X-Real-IP header', async () => {

            await usageService.create({
                cookies: {
                },
                get: (name: string) => {
                    if (name === 'X-Real-IP') {
                        return '1.1.1.1';
                    }

                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: Usage[] = await usageService.list('existing-id');

            expect(result[0].ipAddress).to.be.eq('1.1.1.1');

        });

        it('should create usage with ip address given no X-Real-IP header', async () => {

            await usageService.create({
                cookies: {
                },
                get: (name: string) => {
                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: Usage[] = await usageService.list('existing-id');

            expect(result[0].ipAddress).to.be.eq('::1');

        });

        it('should create usage with referer given referer header', async () => {

            await usageService.create({
                cookies: {
                },
                get: (name: string) => {
                    if (name === 'referer') {
                        return 'http://google.com';
                    }

                    return null;
                },
            } as express.Request, {
                cookie: (name: string, value: string, options: any) => {

                },
            } as express.Response, 'existing-id');

            const result: Usage[] = await usageService.list('existing-id');

            expect(result[0].referer).to.be.eq('http://google.com');

        });

        it('should call cookie on response', async () => {

            const cookieSpy: sinon.SinonSpy = sinon.spy();

            await usageService.create({
                cookies: {
                },
                get: (name: string) => {
                    if (name === 'referer') {
                        return 'http://google.com';
                    }

                    return null;
                },
            } as express.Request, {
                cookie: cookieSpy as any,
            } as express.Response, 'existing-id');

            const result: Usage[] = await usageService.list('existing-id');

            expect(cookieSpy.calledOnce).to.be.true;

        });

    });

});
