/*
 ** @debounce((delay: number, data: any)
 ** function to run
 **/

import { handleFn } from "../utils";
import { IThrottling, ThrottleReturnType, ThrottlingFn } from "../types";

const ThrottleDelays = new Map<string, NodeJS.Timeout>();
const ThrottleResults = new Map<string, unknown>();

const ThrottleDefaults = {
  delay: 2000,
  name: "cached",
};

export function throttling<T>(options: IThrottling<T>): ThrottleReturnType;
export function throttling<T>(
  delay: number,
  fn: ThrottlingFn<T>,
): ThrottleReturnType;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function throttling<T>(delay: number): ThrottleReturnType;
export function throttling<T>(
  name: string,
  fn: ThrottlingFn<T>,
): ThrottleReturnType;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function throttling<T>(name: string): ThrottleReturnType;

export function throttling<T>(
  params: IThrottling<T> | number | string,
  fn?: ThrottlingFn<T>,
): ThrottleReturnType {
  const options = {
    ...ThrottleDefaults,
    ...(typeof params === "number"
      ? { delay: params }
      : typeof params === "string"
        ? { name: params }
        : params),
  };
  options.fn = fn || options.fn;
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      if (
        !ThrottleDelays.has(options.name) ||
        !ThrottleResults.has(options.name)
      ) {
        const data: T = original.apply(this, args);
        handleFn<T>(options, data, (data: T) => {
          ThrottleResults.set(options.name, data);
        });
        ThrottleDelays.set(
          options.name,
          setTimeout(() => {
            ThrottleDelays.delete(options.name);
            ThrottleResults.delete(options.name);
          }, options.delay),
        );
      } else {
        handleFn<T>(options, ThrottleResults.get(options.name) as T);
      }
    };
    return descriptor;
  };
}
