import faker from 'faker';

import appConfig from '~/config/app';
import InvalidTokenException from '~/exceptions/InvalidTokenException';

import FakeSessionProvider from '@users/providers/SessionProvider/implementations/fakes/FakeSessionProvider';
import ISessionProvider from '@users/providers/SessionProvider/ISessionProvider';
import FakeSessionRepository from '@users/repositories/SessionRepository/implementations/fakes/FakeSessionRepository';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';

import RefreshSessionUseCase from './RefreshSessionUseCase';

describe('RefreshSessionUseCase', () => {
  let refreshSessionUseCase: RefreshSessionUseCase;
  let sessionProvider: ISessionProvider;
  let sessionRepository: ISessionRepository;

  beforeAll(() => {
    sessionProvider = new FakeSessionProvider();
    sessionRepository = new FakeSessionRepository();

    refreshSessionUseCase = new RefreshSessionUseCase(
      sessionProvider,
      sessionRepository,
    );
  });

  beforeEach(async () => {
    await sessionRepository.clear();
  });

  it('should be refresh session', async () => {
    const accessToken = await sessionProvider.generateOpaqueToken();
    const refreshToken = await sessionProvider.generateOpaqueToken(false);
    const userId = faker.random.alphaNumeric(appConfig.idLength);

    const session = await sessionRepository.create({
      accessToken: accessToken.hash,
      refreshToken: refreshToken.hash,
      expiresAt: accessToken.expiresAt,
      userId,
    });

    const originalPublicSession = sessionProvider.generatePublicSession(
      session.id,
      accessToken,
      refreshToken,
    );

    const parsePublicToken = jest.spyOn(sessionProvider, 'parsePublicToken');
    const findById = jest.spyOn(sessionRepository, 'findById');
    const generateOpaqueToken = jest.spyOn(sessionProvider, 'generateOpaqueToken');
    const update = jest.spyOn(sessionRepository, 'update');
    const generatePublicSession = jest.spyOn(sessionProvider, 'generatePublicSession');

    const publicSession = await refreshSessionUseCase.execute({
      refreshToken: originalPublicSession.refreshToken!,
    });

    expect(parsePublicToken).toHaveBeenCalledWith(originalPublicSession.refreshToken);

    expect(findById).toHaveBeenCalledWith(session.id);

    expect(generateOpaqueToken).toHaveBeenCalledTimes(2);

    expect(update).toHaveBeenCalled();

    expect(generatePublicSession).toHaveBeenCalled();

    expect(publicSession)
      .not.toBeNull()
      .toBeObject();
  });

  it('should be fail if session id is invalid', async () => {
    const accessToken = await sessionProvider.generateOpaqueToken();
    const refreshToken = await sessionProvider.generateOpaqueToken(false);
    const userId = faker.random.alphaNumeric(appConfig.idLength);

    await sessionRepository.create({
      accessToken: accessToken.hash,
      refreshToken: refreshToken.hash,
      expiresAt: accessToken.expiresAt,
      userId,
    });

    const publicSession = sessionProvider.generatePublicSession(
      faker.random.alphaNumeric(appConfig.idLength),
      accessToken,
      refreshToken,
    );

    expect(
      refreshSessionUseCase.execute({
        refreshToken: publicSession.refreshToken!,
      }),
    ).rejects.toBeInstanceOf(InvalidTokenException);
  });

  it('should be fail if session has not refresh token', async () => {
    const accessToken = await sessionProvider.generateOpaqueToken();
    const refreshToken = await sessionProvider.generateOpaqueToken(false);
    const userId = faker.random.alphaNumeric(appConfig.idLength);

    const session = await sessionRepository.create({
      accessToken: accessToken.hash,
      expiresAt: accessToken.expiresAt,
      userId,
    });

    const publicSession = sessionProvider.generatePublicSession(
      session.id,
      accessToken,
      refreshToken,
    );

    expect(
      refreshSessionUseCase.execute({
        refreshToken: publicSession.refreshToken!,
      }),
    ).rejects.toBeInstanceOf(InvalidTokenException);
  });

  it('should be fail if refresh token value is invalid', async () => {
    const accessToken = await sessionProvider.generateOpaqueToken();
    const refreshToken = await sessionProvider.generateOpaqueToken(false);
    const wrongRefreshToken = await sessionProvider.generateOpaqueToken(false);
    const userId = faker.random.alphaNumeric(appConfig.idLength);

    const session = await sessionRepository.create({
      accessToken: accessToken.hash,
      refreshToken: refreshToken.hash,
      expiresAt: accessToken.expiresAt,
      userId,
    });

    const publicSession = sessionProvider.generatePublicSession(
      session.id,
      accessToken,
      wrongRefreshToken,
    );

    expect(
      refreshSessionUseCase.execute({
        refreshToken: publicSession.refreshToken!,
      }),
    ).rejects.toBeInstanceOf(InvalidTokenException);
  });
});
