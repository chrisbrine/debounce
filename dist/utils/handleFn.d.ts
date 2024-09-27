import { IThrottling, IDebounce } from "../types";
export declare function handleFn<T>(options: IThrottling<T> | IDebounce<T>, data: T | Promise<T>, callback?: (data: T) => void): void;
