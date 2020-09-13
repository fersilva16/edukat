import Knex from 'knex';

const tableName = 'users';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 180).notNullable();
    table.timestamps();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable(tableName);
}
