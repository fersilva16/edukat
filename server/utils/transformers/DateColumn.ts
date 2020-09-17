import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

import Column from './Column';

export default function DateColumn(name: string) {
  const column = Column(name);

  const transformClassOnly = Transform(
    (date: string) => DateTime?.fromSQL(date),
    {
      toClassOnly: true,
    },
  );

  const transformPlainOnly = Transform((date: DateTime) => date?.toISO(), { toPlainOnly: true });

  return (object: Object, propertyName: string) => {
    column(object, propertyName);
    transformClassOnly(object, propertyName);
    transformPlainOnly(object, propertyName);
  };
}
