import { IThrottling, ThrottleReturnType, ThrottlingFn } from "../types";
export declare function throttling<T>(options: IThrottling<T>): ThrottleReturnType;
export declare function throttling<T>(delay: number, fn: ThrottlingFn<T>): ThrottleReturnType;
export declare function throttling<T>(delay: number): ThrottleReturnType;
export declare function throttling<T>(name: string, fn: ThrottlingFn<T>): ThrottleReturnType;
export declare function throttling<T>(name: string): ThrottleReturnType;
