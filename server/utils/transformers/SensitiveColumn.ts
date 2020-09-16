import { Exclude } from 'class-transformer';

import Column from '~/utils/transformers/Column';

export default function SensitiveColumn(name: string) {
  const column = Column(name);
  const exclude = Exclude({ toPlainOnly: true });

  return (object: Object, propertyName?: string) => {
    column(object, propertyName);
    exclude(object, propertyName);
  };
}
