import { plainToClass, classToPlain } from 'class-transformer';
import { ClassType } from 'class-transformer-validator';

function toClass<T, V>(cls: ClassType<T>, plain: V[], ignoreExtraneousValues?: boolean): T[];
function toClass<T, V>(cls: ClassType<T>, plain: V, ignoreExtraneousValues?: boolean): T;
function toClass<T, V>(
  cls: ClassType<T>,
  plain: V | V[],
  ignoreExtraneousValues: boolean = false,
): T | T[] {
  return plainToClass(cls, plain, { excludeExtraneousValues: !ignoreExtraneousValues });
}

function toPlain<T>(object: T[]): Record<string, any>[];
function toPlain<T>(object: T): Record<string, any>;
function toPlain<T>(object: T | T[]): Record<string, any> | Record<string, any>[] {
  return classToPlain(object, { excludeExtraneousValues: true });
}

export default {
  toClass,
  toPlain,
};
