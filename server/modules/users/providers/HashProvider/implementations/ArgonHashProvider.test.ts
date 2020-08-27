import faker from 'faker';

import ArgonHashProvider from './ArgonHashProvider';
import IHashProvider from '../IHashProvider';

describe('ArgonHashProvider', () => {
  let argonHashProvider: IHashProvider;

  beforeAll(() => {
    argonHashProvider = new ArgonHashProvider();
  });

  it('should be hash password and return string', async () => {
    const hash = await argonHashProvider.hash('a');

    expect(hash).toBeString();
  });

  it('should be return true if hash and password is the same', async () => {
    const password = faker.internet.password();

    const hash = await argonHashProvider.hash(password);
    const check = await argonHashProvider.verify(hash, password);

    expect(check).toBeTrue();
  });

  it('should be return false if hash and password is different', async () => {
    const password1 = faker.internet.password();
    const password2 = faker.internet.password();

    const hash = await argonHashProvider.hash(password1);
    const check = await argonHashProvider.verify(hash, password2);

    expect(check).toBeFalse();
  });
});
