import MissingKeyError from './MissingKeyError';

export type Serialize<T> = (value: string) => T;

export function createGet<T>(serialize: Serialize<T>) {
  return (key: string, defaultValue?: T): T | undefined => {
    const value = process.env[key];

    if (typeof value === 'undefined') return defaultValue;

    return serialize(value);
  };

  // return (key: string, defaultValue?: T): T => (
  //   process.env[key] ? serialize(process.env[key]) : defaultValue
  // );
}

export function createGetOrFail<T>(serialize: Serialize<T>) {
  return (key: string): T => {
    const value = process.env[key];

    if (typeof value === 'undefined') throw new MissingKeyError(key);

    return serialize(value);
  };
}
