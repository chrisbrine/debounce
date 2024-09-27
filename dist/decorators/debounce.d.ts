import { DebounceFn, DebounceReturnType, IDebounce } from "../types";
export declare function debounce<T>(options: IDebounce<T>): DebounceReturnType;
export declare function debounce<T>(delay: number, fn: DebounceFn<T>): DebounceReturnType;
export declare function debounce<T>(delay: number): DebounceReturnType;
export declare function debounce<T>(name: string, fn: DebounceFn<T>): DebounceReturnType;
export declare function debounce<T>(name: string): DebounceReturnType;
