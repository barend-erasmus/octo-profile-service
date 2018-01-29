import { injectable } from 'inversify';
import 'reflect-metadata';
import { IStringValidator } from '../interfaces/string-validator';

@injectable()
export class EmailAddressValidator implements IStringValidator {
    public validate(value: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value.toLowerCase());
    }
}
