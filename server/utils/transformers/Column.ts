import { Expose } from 'class-transformer';

export default function Column(name: string) {
  return Expose({ name });
}
