import { Address } from './address';

export class ContactInformation {
    constructor(
        public address: Address,
        public contactNumber: string,
        public emailAddress: string,
    ) {

    }
}
