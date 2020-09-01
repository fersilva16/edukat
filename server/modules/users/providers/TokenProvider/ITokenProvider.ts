export default interface ITokenProvider {
  generateToken<T extends object>(payload?: T): Promise<string>;

  parseToken<T extends object>(token: string): Promise<T>;
}
