import argon2, { argon2id, Options } from 'argon2';
import crypto from 'crypto';

import IHashProvider from '../IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  private options: Options = {
    type: argon2id,
    version: 19,
    timeCost: 3,
    parallelism: 1,
    memoryCost: 4096,
    saltLength: 16,
  };

  private generateSalt(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(this.options.saltLength, (error, salt) => {
        if (error) reject(error);
        else resolve(salt);
      });
    });
  }

  async hash(password: string): Promise<string> {
    const salt = await this.generateSalt();

    return argon2.hash(password, { ...this.options, raw: false, salt });
  }

  async verify(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
