import Knex from 'knex';

const tableName = 'partial_users';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.string('firstname').nullable();
    table.string('lastname').nullable();
    table.string('username', 15).nullable();
    table.string('email', 255).notNullable();
    table.uuid('type_id').references('id').inTable('types').onDelete('CASCADE');
    table.timestamps();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropSchema(tableName);
}
