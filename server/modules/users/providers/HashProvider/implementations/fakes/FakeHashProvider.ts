import IHashProvider from '../../IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  async hash(password: string): Promise<string> {
    return password;
  }

  async verify(hash: string, password: string): Promise<boolean> {
    return hash === password;
  }
}
