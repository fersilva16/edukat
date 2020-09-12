import { createGet, createGetOrFail } from './creators';

const env = {
  boolean: createGet(Boolean),
  booleanOrFail: createGetOrFail(Boolean),

  number: createGet(Number),
  numberOrFail: createGetOrFail(Number),

  string: createGet(String),
  stringOrFail: createGetOrFail(String),
};

export default env;
