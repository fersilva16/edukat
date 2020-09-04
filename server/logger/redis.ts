import Redis, { Command } from 'ioredis';

import logger from '.';

const { sendCommand } = Redis.prototype;

Redis.prototype.sendCommand = function sendCommandWithLogging(command: Command): void {
  logger.debug(`${command.name} ${(command as any).args.join(' ')}`, { label: 'redis' });

  return sendCommand.call(this, command);
};
