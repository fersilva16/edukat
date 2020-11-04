import { DateTime } from 'luxon';

export default interface ICreateInviteDTO {
  uses?: number;

  maxUses?: number;

  typeId?: string;

  ownerId: string;

  expiresAt?: DateTime;
}
