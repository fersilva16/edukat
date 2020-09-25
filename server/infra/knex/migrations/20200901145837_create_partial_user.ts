import Knex from 'knex';

import appConfig from '~/config/app';

const tableName = 'partial_users';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable(tableName, (table) => {
    table.string('id', appConfig.idLength).primary();
    table.string('firstname').nullable();
    table.string('lastname').nullable();
    table.string('email', 255).notNullable();
    table.string('type_id').references('id').inTable('types').onDelete('CASCADE');
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable(tableName);
}
