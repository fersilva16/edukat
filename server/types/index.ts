export { default as IController } from './IController';
export { default as IJob } from './IJob';
export { default as IMiddleware } from './IMiddleware';
export { default as IUseCase } from './IUseCase';

export type Constructor<T> = { new(...args: any[]): T };
