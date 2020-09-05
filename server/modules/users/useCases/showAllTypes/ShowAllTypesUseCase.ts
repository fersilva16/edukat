import { injectable, inject } from 'tsyringe';

import IUseCase from '~/types/IUseCase';

import Type from '@users/entities/Type';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';

@injectable()
export default class ShowAllTypesUseCase implements IUseCase {
  constructor(
    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  async execute(): Promise<Type[]> {
    return this.typeRepository.all();
  }
}
