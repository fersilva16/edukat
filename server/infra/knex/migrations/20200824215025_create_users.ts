import Knex from 'knex';

import appConfig from '~/config/app';

const tableName = 'users';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable(tableName, (table) => {
    table.string('id', appConfig.idLength).primary();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 180).notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable(tableName);
}
