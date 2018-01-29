import * as crypto from 'crypto';
import { IHashStrategy } from '../interfaces/hash-strategy';

export class MD5HashStrategy implements IHashStrategy {
    public hash(value: string): string {
        return crypto.createHash('md5').update(value).digest('hex');
    }
}
