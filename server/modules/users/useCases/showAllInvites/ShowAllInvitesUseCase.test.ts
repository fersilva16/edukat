import faker from 'faker';

import appConfig from '~/config/app';

import IInviteRepository from '@users/repositories/InviteRepository/IInviteRepository';
import FakeInviteRepository from '@users/repositories/InviteRepository/implementations/fakes/FakeInviteRepository';

import ShowAllInvitesUseCase from './ShowAllInvitesUseCase';

describe('ShowAllInvitesUseCase', () => {
  let showAllInvitesUseCase: ShowAllInvitesUseCase;
  let inviteRepository: IInviteRepository;

  beforeAll(() => {
    inviteRepository = new FakeInviteRepository();

    showAllInvitesUseCase = new ShowAllInvitesUseCase(
      inviteRepository,
    );
  });

  beforeEach(async () => {});

  it('should be return all invites', async () => {
    const ownerId = faker.random.alphaNumeric(appConfig.idLength);
    const typeId = faker.random.alphaNumeric(appConfig.idLength);

    const invite1 = await inviteRepository.create({ ownerId, typeId });
    const invite2 = await inviteRepository.create({ ownerId, typeId });
    const invite3 = await inviteRepository.create({ ownerId, typeId });

    const all = jest.spyOn(inviteRepository, 'all');

    const result = await showAllInvitesUseCase.execute();

    expect(result).toBeArray();

    const ids = result.map((invite) => invite.id);

    expect(ids).toIncludeAllMembers([invite1.id, invite2.id, invite3.id]);

    expect(all).toHaveBeenCalled();
  });
});
