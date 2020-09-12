/* eslint-disable no-console */

import MissingKeyError from '~/utils/env/MissingKeyError';

process.on('uncaughtException', (error) => {
  if (error instanceof MissingKeyError) {
    console.log(error.message);

    return;
  }

  console.log(error.stack);
});
