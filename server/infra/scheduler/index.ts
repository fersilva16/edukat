import cron from 'cron';
import { container } from 'tsyringe';

import logger from '~/logger';
import { IJob, Constructor } from '~/types';

const schedulerLogger = logger.child({ label: 'scheduler' });

export default function initializeScheduleJobs(jobConstructors: Constructor<IJob>[]) {
  schedulerLogger.info('Initializing jobs');

  jobConstructors.forEach((jobConstructor) => {
    const job = container.resolve(jobConstructor);
    const time = Reflect.getMetadata('schedule:jobs', jobConstructor);

    cron.job(time, async () => job.execute()).start();

    schedulerLogger.debug(`Started job "${jobConstructor.name}"`);
  });
}
