/* eslint-disable no-bitwise */

import Flags, { KeyofFlags } from '@users/dtos/Flags';

import IPermissionProvider from '../IPermissionProvider';

export default class BitfieldPermissionProvider implements IPermissionProvider {
  private hasBit(bitfield: number, bit: number): boolean {
    return (bitfield & bit) === bit;
  }

  has(bitfield: number, flagOrFlags: KeyofFlags | KeyofFlags[]): boolean {
    if (this.hasBit(bitfield, Flags.ADMINISTRATOR)) return true;

    if (Array.isArray(flagOrFlags)) return flagOrFlags.every((flag) => this.has(bitfield, flag));

    const bit = Flags[flagOrFlags];

    return this.hasBit(bitfield, bit);
  }

  add(bitfield: number, ...flags: KeyofFlags[]): number {
    return bitfield | this.join(flags);
  }

  remove(bitfield: number, ...flags: KeyofFlags[]): number {
    return bitfield & ~this.join(flags);
  }

  join(flags: KeyofFlags[]): number {
    return flags.reduce((total, flag) => total | Flags[flag], 0);
  }
}
