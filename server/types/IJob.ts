export default interface IJob {
  execute(): Promise<void> | void;
}
