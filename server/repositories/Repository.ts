import appConfig from '~/config/app';
import knex from '~/infra/knex';
import random from '~/utils/random';

export default class Repository<T> {
  constructor(protected tableName: string) {}

  protected get table() {
    return knex.table<T>(this.tableName);
  }

  protected async generateId(): Promise<string> {
    const id = random.base62(appConfig.idLength);

    const { rows: [{ exists }] } = await knex.raw(
      `
        SELECT EXISTS (
          SELECT 1
          FROM ${this.tableName}
          WHERE id = ?
          LIMIT 1
        )
      `,
      [id],
    );

    if (exists) return this.generateId();

    return id;
  }
}
