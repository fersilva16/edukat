import { injectable as injectableDecorator } from 'tsyringe';

export default function Cron(time: string) {
  const injectable = injectableDecorator();

  return (target: Function) => {
    injectable(target as any);

    Reflect.defineMetadata('schedule:jobs', time, target);
  };
}
