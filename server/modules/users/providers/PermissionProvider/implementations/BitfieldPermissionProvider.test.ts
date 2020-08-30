/* eslint-disable no-bitwise */

import IPermissionProvider from '../IPermissionProvider';
import BitfieldPermissionProvider from './BitfieldPermissionProvider';

enum FakeFlags {
  A = 1 << 0,
  B = 1 << 1,
  C = 1 << 2,
  D = 1 << 3,
}

describe('BitfieldPermissionProvider', () => {
  let bitfieldPermissionProvider: IPermissionProvider;

  beforeAll(() => {
    bitfieldPermissionProvider = new BitfieldPermissionProvider();
  });

  it('should be able to join permissions', () => {
    const bitfield1 = bitfieldPermissionProvider.join([FakeFlags.A]);
    const bitfield2 = bitfieldPermissionProvider.join([FakeFlags.A, FakeFlags.B]);
    const bitfield3 = bitfieldPermissionProvider.join([FakeFlags.A, FakeFlags.B, FakeFlags.C]);

    expect(bitfield1).toBe(1);
    expect(bitfield2).toBe(3);
    expect(bitfield3).toBe(7);
  });

  it('should be able to add permissions on bitfield', () => {
    const bitfield1 = bitfieldPermissionProvider.add(0, FakeFlags.A);
    const bitfield2 = bitfieldPermissionProvider.add(bitfield1, FakeFlags.B);
    const bitfield3 = bitfieldPermissionProvider.add(bitfield2, FakeFlags.C);

    expect(bitfield1).toBe(1);
    expect(bitfield2).toBe(3);
    expect(bitfield3).toBe(7);
  });

  it('should be able to remove permissions on bitfield', () => {
    const baseBitfield = bitfieldPermissionProvider.join([FakeFlags.A, FakeFlags.B, FakeFlags.C]);

    const bitfield1 = bitfieldPermissionProvider.remove(baseBitfield, FakeFlags.A);
    const bitfield2 = bitfieldPermissionProvider.remove(baseBitfield, FakeFlags.B);
    const bitfield3 = bitfieldPermissionProvider.remove(baseBitfield, FakeFlags.C, FakeFlags.A);

    expect(bitfield1).toBe(6);
    expect(bitfield2).toBe(5);
    expect(bitfield3).toBe(2);
  });

  it('must be able to verify if a bitfield contains a permission', () => {
    const baseBitfield = bitfieldPermissionProvider.join([FakeFlags.A, FakeFlags.B, FakeFlags.C]);

    const check1 = bitfieldPermissionProvider.has(baseBitfield, FakeFlags.A);
    const check2 = bitfieldPermissionProvider.has(baseBitfield, FakeFlags.B);
    const check3 = bitfieldPermissionProvider.has(baseBitfield, FakeFlags.C);
    const check4 = bitfieldPermissionProvider.has(baseBitfield, FakeFlags.D);

    expect(check1).toBeTrue();
    expect(check2).toBeTrue();
    expect(check3).toBeTrue();
    expect(check4).toBeFalse();
  });
});
