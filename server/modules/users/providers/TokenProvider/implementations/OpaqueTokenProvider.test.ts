import { DateTime } from 'luxon';
import faker from 'faker';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import base64Url from '~/utils/base64Url';

import ITokenProvider from '../ITokenProvider';
import OpaqueTokenProvider from './OpaqueTokenProvider';

describe('OpaqueTokenProvider', () => {
  let opaqueTokenProvider: ITokenProvider;

  beforeAll(() => {
    opaqueTokenProvider = new OpaqueTokenProvider();
  });

  it('should be able to generate token', () => {
    const token = opaqueTokenProvider.generateToken();

    expect(token)
      .not.toBeNull()
      .toBeObject();

    expect(token.value).toBeString();

    expect(token.hash)
      .toBeString()
      .toHaveLength(64);

    if (token.expiresAt) expect(token.expiresAt).toBeInstanceOf(DateTime);
  });

  it('should be able to generate public token', () => {
    const token = opaqueTokenProvider.generateToken();
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

  it('should be able to parse public token', () => {
    const token = opaqueTokenProvider.generateToken();
    const id = faker.random.uuid();

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    const parsed = opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${publicToken.token}`);

    expect(parsed)
      .not.toBeNull()
      .toBeObject();

    expect(parsed.id).toBe(id);

    expect(parsed.value).toBe(token.value);

    expect(parsed.hash).toBe(token.hash);
  });

  it('should be throw a error if public token has invalid type', () => {
    const token = opaqueTokenProvider.generateToken();
    const id = faker.random.uuid();
    const invalidType = faker.random.alphaNumeric(6);

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    expect(() => {
      opaqueTokenProvider.parsePublicToken(publicToken.token);
    }).toThrow(InvalidTokenException);

    expect(() => {
      opaqueTokenProvider.parsePublicToken(`${invalidType} ${publicToken.token}`);
    }).toThrow(InvalidTokenException);
  });

  it('should be throw a error if public token has invalid token', () => {
    const token = opaqueTokenProvider.generateToken();
    const id = faker.random.uuid();
    const invalidToken = faker.random.alphaNumeric(64);

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    expect(() => {
      opaqueTokenProvider.parsePublicToken(publicToken.type);
    }).toThrow(InvalidTokenException);

    expect(() => {
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${invalidToken}`);
    }).toThrow(InvalidTokenException);
  });

  it('should be throw a error if public token has invalid token id', () => {
    const token = opaqueTokenProvider.generateToken();
    const id = faker.random.uuid();

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    expect(() => {
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} .${token.value}`);
    }).toThrow(InvalidTokenException);

    expect(() => {
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${id}.${token.value}`);
    }).toThrow(InvalidTokenException);
  });

  it('should be throw a error if public token has invalid token value', () => {
    const token = opaqueTokenProvider.generateToken();
    const invalidToken = faker.random.alphaNumeric(32);
    const id = faker.random.uuid();
    const encodedId = base64Url.encode(id);

    const publicToken = opaqueTokenProvider.generatePublicToken(token, id);

    expect(() => {
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${encodedId}.`);
    }).toThrow(InvalidTokenException);

    expect(() => {
      opaqueTokenProvider.parsePublicToken(`${publicToken.type} ${encodedId}.${invalidToken}`);
    }).toThrow(InvalidTokenException);
  });
});
