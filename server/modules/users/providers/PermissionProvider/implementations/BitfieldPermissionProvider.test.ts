/* eslint-disable no-bitwise */

import IPermissionProvider from '../IPermissionProvider';
import BitfieldPermissionProvider from './BitfieldPermissionProvider';

describe('BitfieldPermissionProvider', () => {
  let bitfieldPermissionProvider: IPermissionProvider;

  beforeAll(() => {
    bitfieldPermissionProvider = new BitfieldPermissionProvider();
  });

  it('should be able to join permissions', () => {
    const bitfield1 = bitfieldPermissionProvider.join(['ADMINISTRATOR']);
    const bitfield2 = bitfieldPermissionProvider.join(['ADMINISTRATOR', 'MANAGE_USERS']);
    const bitfield3 = bitfieldPermissionProvider.join(['ADMINISTRATOR', 'MANAGE_USERS', 'MANAGE_TYPES']);

    expect(bitfield1).toBe(1);
    expect(bitfield2).toBe(3);
    expect(bitfield3).toBe(7);
  });

  it('should be able to add permissions on bitfield', () => {
    const bitfield1 = bitfieldPermissionProvider.add(0, 'ADMINISTRATOR');
    const bitfield2 = bitfieldPermissionProvider.add(bitfield1, 'MANAGE_USERS');
    const bitfield3 = bitfieldPermissionProvider.add(bitfield2, 'MANAGE_TYPES');

    expect(bitfield1).toBe(1);
    expect(bitfield2).toBe(3);
    expect(bitfield3).toBe(7);
  });

  it('should be able to remove permissions on bitfield', () => {
    const baseBitfield = bitfieldPermissionProvider.join(['ADMINISTRATOR', 'MANAGE_USERS', 'MANAGE_TYPES']);

    const bitfield1 = bitfieldPermissionProvider.remove(baseBitfield, 'ADMINISTRATOR');
    const bitfield2 = bitfieldPermissionProvider.remove(baseBitfield, 'MANAGE_USERS');
    const bitfield3 = bitfieldPermissionProvider.remove(baseBitfield, 'MANAGE_TYPES', 'ADMINISTRATOR');

    expect(bitfield1).toBe(6);
    expect(bitfield2).toBe(5);
    expect(bitfield3).toBe(2);
  });

  it('should be able to verify if a bitfield contains a permission', () => {
    const baseBitfield = bitfieldPermissionProvider.join(['MANAGE_USERS', 'MANAGE_TYPES']);

    const check1 = bitfieldPermissionProvider.has(baseBitfield, 'ADMINISTRATOR');
    const check2 = bitfieldPermissionProvider.has(baseBitfield, 'MANAGE_USERS');
    const check3 = bitfieldPermissionProvider.has(baseBitfield, 'MANAGE_TYPES');

    expect(check1).toBeFalse();
    expect(check2).toBeTrue();
    expect(check3).toBeTrue();
  });

  it('should be always return true if bitfield has administrator flag', () => {
    const baseBitfield = bitfieldPermissionProvider.join(['ADMINISTRATOR']);

    const check1 = bitfieldPermissionProvider.has(baseBitfield, 'MANAGE_USERS');
    const check2 = bitfieldPermissionProvider.has(baseBitfield, 'MANAGE_TYPES');

    expect(check1).toBeTrue();
    expect(check2).toBeTrue();
  });
});
