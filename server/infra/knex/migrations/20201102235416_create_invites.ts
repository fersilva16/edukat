import Knex from 'knex';

import appConfig from '~/config/app';

const tableName = 'invites';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable(tableName, (table) => {
    table.string('id', appConfig.idLength).primary();
    table.integer('uses').notNullable();
    table.integer('max_uses').nullable();
    table.string('owner_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('type_id').references('id').inTable('types').onDelete('CASCADE');
    table.timestamp('expires_at').nullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable(tableName);
}
