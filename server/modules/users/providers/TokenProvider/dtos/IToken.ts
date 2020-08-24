import { DateTime } from 'luxon';

export default interface IToken {
  value: string;
  hash: string;
  expiresAt?: DateTime;
}
