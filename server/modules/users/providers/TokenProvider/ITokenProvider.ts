export default interface ITokenProvider {
  generateToken<T extends object>(payload?: T, expires?: boolean): Promise<string>;

  parseToken<T extends object>(token: string): Promise<T>;
}
