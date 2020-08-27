import Knex from 'knex';

const tableName = 'sessions';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.string('token', 64).notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('created_at', { useTz: true }).notNullable();
    table.timestamp('expires_at', { useTz: true }).nullable();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropSchema(tableName);
}
