/* eslint-disable no-bitwise */

import IPermissionProvider from '../IPermissionProvider';

export default class BitfieldPermissionProvider implements IPermissionProvider {
  has(bitfield: number, bits: number | number[]): boolean {
    if (Array.isArray(bits)) return bits.every((bit) => this.has(bitfield, bit));

    return (bitfield & bits) === bits;
  }

  add(bitfield: number, ...bits: number[]): number {
    return bitfield | this.join(bits);
  }

  remove(bitfield: number, ...bits: number[]): number {
    return bitfield & ~this.join(bits);
  }

  join(bits: number[]): number {
    return bits.reduce((total, bit) => total | bit, 0);
  }
}
