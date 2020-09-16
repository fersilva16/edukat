import Type from '@users/entities/Type';

import ICreateTypeDTO from './dtos/ICreateTypeDTO';

export default interface ITypeRepository {
  all(): Promise<Type[]>;

  findById(id: string): Promise<Type>;

  create(data: ICreateTypeDTO): Promise<Type>

  clear(): Promise<void>;
}
