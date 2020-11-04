import appConfig from '~/config/app';
import knex from '~/infra/knex';
import random from '~/utils/random';

export default class Repository<T> {
  protected raw = knex.raw;

  constructor(protected tableName: string) {}

  protected get table() {
    return knex.table<T>(this.tableName);
  }

  protected async generateId(): Promise<string> {
    const id = random.base62(appConfig.idLength);

    const result = await this.table.select<{ exists: boolean }>(
      this.raw(
        'exists ?',
        this.table.select('*').where('id', id),
      ),
    ).first();

    if (result && result.exists) return this.generateId();

    return id;
  }
}
