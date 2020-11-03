import { DateTime } from 'luxon';

import Repository from '~/repositories/Repository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

import Invite from '@users/entities/Invite';
import IRawInvite from '@users/entities/raws/IRawInvite';

import ICreateInviteDTO from '../dtos/ICreateInviteDTO';
import IInviteRepository from '../IInviteRepository';

export default class KnexInviteRepository
  extends Repository<IRawInvite> implements IInviteRepository {
  constructor() {
    super('invites');
  }

  async all(): Promise<Invite[]> {
    const rows = await this.table.select('*');

    return transform.toClass(Invite, rows);
  }

  async findById(id: string): Promise<Invite> {
    const findedRow = await this.table.select('*').where('id', id).first();

    return transform.toClass(Invite, findedRow);
  }

  async create({ uses, ...data }: ICreateInviteDTO): Promise<Invite> {
    const id = await this.generateId();
    const dateNow = DateTime.local().toISO()!;

    const row: IRawInvite = {
      ...transformRepositoryDTO(data),

      uses: uses ?? 0,

      id,

      created_at: dateNow,
      updated_at: dateNow,
    };

    await this.table.insert(row);

    return transform.toClass(Invite, row);
  }

  async update(id: string, data: Partial<ICreateInviteDTO>): Promise<void> {
    await this.table.update(transformRepositoryDTO(data)).where('id', id);
  }

  async clear(): Promise<void> {
    await this.table.truncate();
  }
}
