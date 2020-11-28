/* eslint-disable no-bitwise */

enum Flags {
  ADMINISTRATOR = 1 << 0,

  MANAGE_USERS = 1 << 1,
  CREATE_USERS = 1 << 2,

  MANAGE_TYPES = 1 << 3,
  VIEW_TYPES = 1 << 4,

  MANAGE_INVITES = 1 << 5,
  VIEW_INVITES = 1 << 6,
  CREATE_INVITES = 1 << 7,
}

export type KeyofFlags = keyof typeof Flags;

export default Flags;
