import ICreateTypeDTO from '@users/dtos/ICreateTypeDTO';
import Type from '@users/entities/Type';

export default interface ITypeRepository {
  create(data: ICreateTypeDTO): Promise<Type>
}
