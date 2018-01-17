import { expect } from 'chai';
import * as express from 'express';
import 'mocha';
import * as sinon from 'sinon';
import { Usage } from '../entities/usage';
import { UsageRepository } from '../repositories/sequelize/usage';
import { BaseRepository } from './../repositories/sequelize/base';
import { UsageService } from './usage';

describe('UserService', () => {

    describe('create', () => {

        let baseRepository: BaseRepository = null;
        let usageRepository: UsageRepository = null;

        let usageService: UsageService = null;

        beforeEach(async () => {
            baseRepository = new BaseRepository(null, null, null);
            usageRepository = new UsageRepository(null, null, null);

            await baseRepository.sync();

            usageService = new UsageService(usageRepository);

        });

        afterEach(async () => {
            await baseRepository.sync();

            baseRepository = null;
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
            } as express.Response, 'profileId');

            const result: Usage[] = await usageService.list('profileId');

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
            } as express.Response, 'profileId');

            const result: Usage[] = await usageService.list('profileId');

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
            } as express.Response, 'profileId');

            const result: Usage[] = await usageService.list('profileId');

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
            } as express.Response, 'profileId');

            const result: Usage[] = await usageService.list('profileId');

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
            } as express.Response, 'profileId');

            const result: Usage[] = await usageService.list('profileId');

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
            } as express.Response, 'profileId');

            const result: Usage[] = await usageService.list('profileId');

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
            } as express.Response, 'profileId');

            const result: Usage[] = await usageService.list('profileId');

            expect(cookieSpy.calledOnce).to.be.true;

        });

    });

});
