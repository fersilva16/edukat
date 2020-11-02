import { DateTime } from 'luxon';

export default function transformRepositoryDTO<T extends Object>(object: Object): T {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(),
      DateTime.isDateTime(value) ? value.toISO()! : value,
    ]),
  ) as T;
}
