import Knex from 'knex';

const tableName = 'types';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('permissions').notNullable();
    table.timestamps();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropSchema(tableName);
}
