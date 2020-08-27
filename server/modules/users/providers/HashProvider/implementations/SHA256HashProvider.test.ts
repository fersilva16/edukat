import faker from 'faker';

import IHashProvider from '../IHashProvider';
import SHA256HashProvider from './SHA256HashProvider';

describe('SHA256HashProvider', () => {
  let sha256HashProvider: IHashProvider;

  beforeAll(() => {
    sha256HashProvider = new SHA256HashProvider();
  });

  it('should be hash password and return string', async () => {
    const token = faker.random.alphaNumeric(60);

    const hash = await sha256HashProvider.hash(token);

    expect(hash).toBeString().toHaveLength(64);
  });

  it('should be return true if hash and password is the same', async () => {
    const token = faker.random.alphaNumeric(60);

    const hash = await sha256HashProvider.hash(token);
    const check = await sha256HashProvider.verify(hash, token);

    expect(check).toBeTrue();
  });

  it('should be return false if hash and password is different', async () => {
    const token1 = faker.random.alphaNumeric(60);
    const token2 = faker.random.alphaNumeric(60);

    const hash = await sha256HashProvider.hash(token1);
    const check = await sha256HashProvider.verify(hash, token2);

    expect(check).toBeFalse();
  });
});
