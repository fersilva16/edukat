import cron from 'cron';
import { container } from 'tsyringe';

import logger from '~/logger';
import IJob from '~/types/IJob';

const schedulerLogger = logger.child({ label: 'scheduler' });

export default function initializeScheduleJobs(jobConstructors: { new(...args: any[]): IJob }[]) {
  schedulerLogger.info('Initializing jobs');

  jobConstructors.forEach((jobConstructor) => {
    const job = container.resolve(jobConstructor);
    const time = Reflect.getMetadata('schedule:jobs', jobConstructor);

    cron.job(time, job.execute).start();

    schedulerLogger.debug(`Started job "${jobConstructor.name}"`);
  });
}
