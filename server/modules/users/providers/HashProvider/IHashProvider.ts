export default interface IHashProvider {
  hash(password: string): Promise<string>;

  verify(hash: string, password: string): Promise<boolean>;
}
