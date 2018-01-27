export interface IHashStrategy {
    hash(value: string): string;
}