import { inject } from 'tsyringe';

import { Cron } from '~/decorators';
import logger from '~/logger';
import { IJob } from '~/types';

import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';

@Cron('0 12 * * *')
export default class SessionCleanerJob implements IJob {
  constructor(
    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute() {
    const sessions = await this.sessionRepository.allExpired();

    await Promise.all(
      sessions.map(({ id }) => this.sessionRepository.delete(id)),
    );

    logger.debug('Cleaned all expired sessions on database', { label: 'sessionCleaner' });
  }
}
