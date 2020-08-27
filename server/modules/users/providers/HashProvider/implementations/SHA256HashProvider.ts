import { createHash } from 'crypto';

import IHashProvider from '../IHashProvider';

export default class SHA256HashProvider implements IHashProvider {
  async hash(token: string): Promise<string> {
    return createHash('sha256').update(token).digest('hex');
  }

  async verify(hash: string, token: string): Promise<boolean> {
    const tokenHash = await this.hash(token);

    return hash === tokenHash;
  }
}
