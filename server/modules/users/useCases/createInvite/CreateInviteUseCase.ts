import { DateTime } from 'luxon';
import { injectable, inject } from 'tsyringe';

import NoPermissionException from '~/exceptions/NoPermissionException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IUseCase from '~/types/IUseCase';

import IInviteRepository from '@users/repositories/InviteRepository/IInviteRepository';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';

import CreateInviteDTO from './CreateInviteDTO';

@injectable()
export default class CreateInviteUseCase implements IUseCase {
  constructor(
    @inject('TypeRepository')
    private typeRepository: ITypeRepository,

    @inject('InviteRepository')
    private inviteRepository: IInviteRepository,
  ) {}

  async execute({
    user,
    userType,
    typeId,
    expiresIn,
    maxUses,
  }: CreateInviteDTO): Promise<void> {
    if (typeId) {
      const type = await this.typeRepository.findById(typeId);

      if (!type) throw new ResourceNotFoundException('Type');

      if (type.position < userType.position) throw new NoPermissionException();
    }

    await this.inviteRepository.create({
      ownerId: user.id,

      typeId,
      maxUses,
      expiresAt: expiresIn ? DateTime.local().plus({ seconds: expiresIn }) : undefined,
    });
  }
}
