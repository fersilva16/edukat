import { Options, argon2id } from 'argon2';

const hashConfig: Options = {
  type: argon2id,
  version: 19,
  timeCost: 3,
  parallelism: 1,
  memoryCost: 4096,
  saltLength: 16,
};

export default hashConfig;
