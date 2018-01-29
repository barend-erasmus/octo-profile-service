import * as crypto from 'crypto';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IHashStrategy } from '../interfaces/hash-strategy';

@injectable()
export class MD5HashStrategy implements IHashStrategy {
    public hash(value: string): string {
        return crypto.createHash('md5').update(value).digest('hex');
    }
}
