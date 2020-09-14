import Knex from 'knex';

const tableName = 'users';

export async function up({ schema }: Knex): Promise<void> {
  await schema.table(tableName, (table) => {
    table.string('type_id').references('id').inTable('types').onDelete('CASCADE');
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.table(tableName, (table) => {
    table.dropColumn('type_id');
  });
}
