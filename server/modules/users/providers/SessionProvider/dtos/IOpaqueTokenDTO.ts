import { DateTime } from 'luxon';

export default interface IOpaqueTokenDTO {
  value: string;
  hash: string;
  expiresAt?: DateTime;
}
