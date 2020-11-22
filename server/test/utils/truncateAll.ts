import knex from '~/infra/knex';

type Table = {
  name: string;
};

export default async function truncateAll() {
  const tables = await knex.select<Table[]>('*').from('sqlite_master').where('type', 'table');

  if (!tables) return;

  await Promise.all(
    tables.map((table) => knex.table(table.name).truncate()),
  );
}
