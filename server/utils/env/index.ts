import { createGet, createGetOrFail } from './creators';

const env = {
  boolean: createGet((value) => value === 'true'),
  booleanOrFail: createGetOrFail((value) => value === 'true'),

  number: createGet(Number),
  numberOrFail: createGetOrFail(Number),

  string: createGet(String),
  stringOrFail: createGetOrFail(String),
};

export default env;
