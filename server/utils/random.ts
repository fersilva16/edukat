import { randomBytes } from 'crypto';

import base64Url from './base64Url';

function create(serialize: (data: Buffer) => string) {
  return (length: number): string => {
    const bits = (length + 1) * 6;
    const buffer = randomBytes(Math.ceil(bits / 8));

    return serialize(buffer).slice(0, length);
  };
}

export default {
  base64: create(base64Url.encode),
  base62: create((data) => data.toString('base64').replace(/[+.=/]/g, '')),
};
