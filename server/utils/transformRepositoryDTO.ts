import { DateTime } from 'luxon';

export default function transformRepositoryDTO<T extends Object>(object: Object): T {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key.replace(/([a-z])([A-Z])/g, ([before, after]) => `${before}_${after}`).toLowerCase(),
      DateTime.isDateTime(value) ? value.toISO()! : value,
    ]),
  ) as T;
}
