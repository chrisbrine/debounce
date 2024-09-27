export type ThrottlingFn<T> = (data: T) => void;

export interface IThrottling<T> {
  delay?: number;
  name?: string;
  fn?: ThrottlingFn<T>;
}

export type ThrottleReturnType = (
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor | void;
