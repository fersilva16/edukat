import { Factory } from 'rosie';

import FakeTypeRepository from '@users/repositories/TypeRepository/implementations/fakes/FakeTypeRepository';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';

import ShowAllTypesUseCase from './ShowAllTypesUseCase';

describe('ShowAllTypesUseCase', () => {
  let showAllTypesUseCase: ShowAllTypesUseCase;
  let typeRepository: ITypeRepository;

  beforeAll(() => {
    typeRepository = new FakeTypeRepository();

    showAllTypesUseCase = new ShowAllTypesUseCase(typeRepository);
  });

  it('should be return all types', async () => {
    const type1 = await typeRepository.create(Factory.build('type'));
    const type2 = await typeRepository.create(Factory.build('type'));
    const type3 = await typeRepository.create(Factory.build('type'));

    const result = await showAllTypesUseCase.execute();

    expect(result).toBe([type1, type2, type3]);
  });
});
