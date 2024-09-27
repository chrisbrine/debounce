export type DebounceFn<T> = (data: T) => void;
export interface IDebounce<T> {
    delay?: number;
    name?: string;
    fn?: DebounceFn<T>;
    chaining?: boolean;
}
export type DebounceReturnType = (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor | void;
