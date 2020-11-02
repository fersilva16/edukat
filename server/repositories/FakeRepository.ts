import appConfig from '~/config/app';
import random from '~/utils/random';

export default class FakeRepository<T extends { id: string }> {
  protected rows: T[] = [];

  protected generateId(): string {
    const id = random.base62(appConfig.idLength);

    const exists = this.rows.find((row) => row.id === id);

    if (exists) return this.generateId();

    return id;
  }
}
