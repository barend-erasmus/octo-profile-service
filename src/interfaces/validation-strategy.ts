export interface IValidationStrategy<T> {
    validate(value: T): boolean;
}
