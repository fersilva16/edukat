import { DateTime } from 'luxon';
import faker from 'faker';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import base64Url from '~/utils/base64Url';

import ITokenProvider from '../ITokenProvider';
import OpaqueTokenProvider from './OpaqueTokenProvider';
import SHA256HashProvider from '../../HashProvider/implementations/SHA256HashProvider';

describe('OpaqueTokenProvider', () => {
  let opaqueTokenProvider: ITokenProvider;

  beforeAll(() => {
    opaqueTokenProvider = new OpaqueTokenProvider(
      new SHA256HashProvider(),
    );
  });

  it('should be able to generate token', async () => {
    const token = await opaqueTokenProvider.generateToken();

    expect(token)
      .not.toBeNull()
      .toBeObject();

    expect(token.value).toBeString();

    expect(token.hash)
      .toBeString()
      .toHaveLength(64);

    if (token.expiresAt) expect(token.expiresAt).toBeInstanceOf(DateTime);
  });

  it('should be able to generate public token', async () => {
    const token = await opaqueTokenProvider.generateToken();
    const id = faker.random.uuid();

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    expect(publicToken)
      .not.toBeNull()
      .toBeObject();

    expect(publicToken.type).toBe('Bearer');

    expect(publicToken.token).toBeString();

    if (publicToken.expiresAt) {
      expect(publicToken.expiresAt).toBeString();

      const expiresAt = DateTime.fromISO(publicToken.expiresAt);

      expect(expiresAt.isValid).toBeTrue();
    }
  });

  it('should be able to parse public token', async () => {
    const token = await opaqueTokenProvider.generateToken();
    const id = faker.random.uuid();

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    const parsed = await opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${publicToken.token}`);

    expect(parsed)
      .not.toBeNull()
      .toBeObject();

    expect(parsed.id).toBe(id);

    expect(parsed.value).toBe(token.value);

    expect(parsed.hash).toBe(token.hash);
  });

  it('should be throw a error if public token has invalid type', async () => {
    const token = await opaqueTokenProvider.generateToken();
    const id = faker.random.uuid();
    const invalidType = faker.random.alphaNumeric(6);

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    expect(
      opaqueTokenProvider.parsePublicToken(publicToken.token),
    ).rejects.toBeInstanceOf(InvalidTokenException);

    expect(
      opaqueTokenProvider.parsePublicToken(`${invalidType} ${publicToken.token}`),
    ).rejects.toBeInstanceOf(InvalidTokenException);
  });

  it('should be throw a error if public token has invalid token', async () => {
    const token = await opaqueTokenProvider.generateToken();
    const id = faker.random.uuid();
    const invalidToken = faker.random.alphaNumeric(64);

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    expect(
      opaqueTokenProvider.parsePublicToken(publicToken.type),
    ).rejects.toBeInstanceOf(InvalidTokenException);

    expect(
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${invalidToken}`),
    ).rejects.toBeInstanceOf(InvalidTokenException);
  });

  it('should be throw a error if public token has invalid token id', async () => {
    const token = await opaqueTokenProvider.generateToken();
    const id = faker.random.uuid();

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    expect(
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} .${token.value}`),
    ).rejects.toBeInstanceOf(InvalidTokenException);

    expect(
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${id}.${token.value}`),
    ).rejects.toBeInstanceOf(InvalidTokenException);
  });

  it('should be throw a error if public token has invalid token value', async () => {
    const token = await opaqueTokenProvider.generateToken();
    const invalidToken = faker.random.alphaNumeric(32);
    const id = faker.random.uuid();
    const encodedId = base64Url.encode(id);

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    expect(
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${encodedId}.`),
    ).rejects.toBeInstanceOf(InvalidTokenException);

    expect(
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${encodedId}.${invalidToken}`),
    ).rejects.toBeInstanceOf(InvalidTokenException);
  });
});
