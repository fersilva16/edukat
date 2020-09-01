import { KeyofFlags } from '@users/dtos/Flags';

export default interface IPermissionProvider {
  has(bitfield: number, flag: KeyofFlags): boolean;
  has(bitfield: number, flags: KeyofFlags[]): boolean;

  add(bitfield: number, ...flags: KeyofFlags[]): number;

  remove(bitfield: number, ...flags: KeyofFlags[]): number;

  join(bits: KeyofFlags[]): number;
}
