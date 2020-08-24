function encode(data: string | Buffer): string {
  return Buffer.from(data).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function decode(base64: string | Buffer, strict: boolean = false): string {
  if (Buffer.isBuffer(base64)) return base64.toString();

  const decoded = Buffer.from(base64, 'base64').toString();

  if (strict && encode(decoded) !== base64) return undefined;

  return decoded;
}

export default {
  encode,
  decode,
};
