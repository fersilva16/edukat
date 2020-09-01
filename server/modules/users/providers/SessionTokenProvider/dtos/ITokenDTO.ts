import { DateTime } from 'luxon';

export default interface ITokenDTO {
  value: string;
  hash: string;
  expiresAt?: DateTime;
}
