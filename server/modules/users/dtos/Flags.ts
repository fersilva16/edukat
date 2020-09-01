/* eslint-disable no-bitwise */

enum Flags {
  ADMINISTRATOR = 1 << 0,
  MANAGE_USERS = 1 << 1,
  MANAGE_TYPES = 1 << 2,
}

export type FlagsKeys = keyof typeof Flags;

export default Flags;
