export default interface IUseCase {
  execute(...args: any): Promise<any>;
}
