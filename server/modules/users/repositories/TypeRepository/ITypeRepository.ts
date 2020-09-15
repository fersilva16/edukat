import ICreateTypeDTO from '@users/dtos/ICreateTypeDTO';
import Type from '@users/entities/Type';

export default interface ITypeRepository {
  all(): Promise<Type[]>;

  findById(id: string): Promise<Type>;

  create(data: ICreateTypeDTO): Promise<Type>

  clear(): Promise<void>;
}
