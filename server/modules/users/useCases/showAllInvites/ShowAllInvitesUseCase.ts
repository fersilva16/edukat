import { injectable, inject } from 'tsyringe';

import IUseCase from '~/types/IUseCase';

import Invite from '@users/entities/Invite';
import IInviteRepository from '@users/repositories/InviteRepository/IInviteRepository';

@injectable()
export default class ShowAllInvitesUseCase implements IUseCase {
  constructor(
    @inject('InviteRepository')
    private inviteRepository: IInviteRepository,
  ) {}

  async execute(): Promise<Invite[]> {
    return this.inviteRepository.all();
  }
}
