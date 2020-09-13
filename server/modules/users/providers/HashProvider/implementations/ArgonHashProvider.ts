import argon2 from 'argon2';
import { randomBytes } from 'crypto';

import hashConfig from '~/config/hash';

import IHashProvider from '../IHashProvider';

export default class ArgonHashProvider implements IHashProvider {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      ...hashConfig,
      raw: false,
      salt: randomBytes(hashConfig.saltLength),
    });
  }

  async verify(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
