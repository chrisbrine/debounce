import { handleFn } from "../utils";
import { DebounceFn, DebounceReturnType, IDebounce } from "../types";

const Debounces = new Map<string, NodeJS.Timeout>();
const DebounceFns = new Map<string, DebounceFn<unknown>[]>();

const DebounceDefaults = {
  delay: 500,
  name: "debounce",
  chaining: false,
};

export function debounce<T>(options: IDebounce<T>): DebounceReturnType;
export function debounce<T>(
  delay: number,
  fn: DebounceFn<T>,
): DebounceReturnType;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function debounce<T>(delay: number): DebounceReturnType;
export function debounce<T>(
  name: string,
  fn: DebounceFn<T>,
): DebounceReturnType;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function debounce<T>(name: string): DebounceReturnType;

export function debounce<T>(
  params: IDebounce<T> | number | string,
  fn?: DebounceFn<T>,
): DebounceReturnType {
  const options = {
    ...DebounceDefaults,
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
      if (Debounces.has(options.name)) {
        clearTimeout(Debounces.get(options.name));
      }
      if (options.chaining && options.fn && typeof options.fn === "function") {
        const fns =
          DebounceFns.get(options.name) || ([] as DebounceFn<unknown>[]);
        DebounceFns.set(options.name, [
          ...fns,
          options.fn,
        ] as DebounceFn<unknown>[]);
      }
      Debounces.set(
        options.name,
        setTimeout(() => {
          Debounces.delete(options.name);
          const data = original.apply(this, args);
          if (options.chaining) {
            const fns =
              DebounceFns.get(options.name) || ([] as DebounceFn<unknown>[]);
            fns.forEach((fn) => handleFn({ ...options, fn }, data));
          } else {
            handleFn<T>(options, data);
          }
        }, options.delay),
      );
    };
    return descriptor;
  };
}
