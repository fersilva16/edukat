import { randomBytes } from 'crypto';

import base64Url from './base64Url';

export default function randomString(length: number): string {
  const bits = (length + 1) * 6;
  const buffer = randomBytes(Math.ceil(bits / 8));

  return base64Url.encode(buffer).slice(0, length);
}
