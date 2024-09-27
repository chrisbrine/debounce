/* eslint-disable @typescript-eslint/no-unused-expressions */
import { IThrottling, IDebounce } from "../types";

export function handleFn<T>(
  options: IThrottling<T> | IDebounce<T>,
  data: T | Promise<T>,
  callback?: (data: T) => void,
) {
  if (options.fn && typeof options.fn === "function") {
    if (data instanceof Promise) {
      data.then((res: T) => {
        options.fn && options.fn(res);
        callback && callback(res);
      });
    } else {
      options.fn(data);
      callback && callback(data);
    }
  }
}
