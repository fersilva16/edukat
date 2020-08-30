export default interface IPermissionProvider {
  has(bitfield: number, bit: number): boolean;
  has(bitfield: number, bits: number[]): boolean;

  add(bitfield: number, ...bits: number[]): number;

  remove(bitfield: number, ...bits: number[]): number;

  join(bits: number[]): number;
}
