import { plainToClass, classToPlain } from 'class-transformer';
import { ClassType } from 'class-transformer-validator';

export function toClass<T, V>(cls: ClassType<T>, plain: V[]): T[];
export function toClass<T, V>(cls: ClassType<T>, plain: V): T;
export function toClass<T, V>(cls: ClassType<T>, plain: V | V[]): T | T[] {
  return plainToClass(cls, plain, { excludeExtraneousValues: true });
}

export function toPlain<T>(object: T[]): Record<string, any>[];
export function toPlain<T>(object: T): Record<string, any>;
export function toPlain<T>(object: T | T[]): Record<string, any> | Record<string, any>[] {
  return classToPlain(object, { excludeExtraneousValues: true });
}
