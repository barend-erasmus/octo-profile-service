export class User {
    constructor(
        public userName: string,
        public password: string,
    ) {

    }

    public clearPassword(): void {
        this.setPassword(null);
    }

    public setPassword(password: string): void {
        this.password = password;
    }
}
