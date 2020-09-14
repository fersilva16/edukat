import Knex from 'knex';

import appConfig from '~/config/app';

const tableName = 'sessions';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable(tableName, (table) => {
    table.string('id', appConfig.idLength).primary();
    table.string('token', 64).notNullable();
    table.string('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('created_at', { useTz: true }).notNullable();
    table.timestamp('expires_at', { useTz: true }).nullable();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable(tableName);
}
