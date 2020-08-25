import Knex from 'knex';

const tableName = 'users';

export async function up({ schema }: Knex): Promise<void> {
  schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('username', 15).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 180).notNullable();
    table.timestamps();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  schema.dropTable(tableName);
}
