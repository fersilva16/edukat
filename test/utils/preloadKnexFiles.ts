import fs from 'fs';
import path from 'path';

import databaseConfig from '~/config/database';

function concat(directory: string) {
  return (name: string) => path.join(directory, name);
}

export default function preloadKnexFiles() {
  const migrationsDirectory = databaseConfig.migrations!.directory as string;
  const seedsDirectory = databaseConfig.seeds!.directory as string;

  const files = [
    ...fs.readdirSync(migrationsDirectory, 'utf-8').map(concat(migrationsDirectory)),
    ...fs.readdirSync(seedsDirectory, 'utf-8').map(concat(seedsDirectory)),
  ];

  files.map(require);
}
