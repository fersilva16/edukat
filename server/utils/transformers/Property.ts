import { Expose } from 'class-transformer';

export default function Property(name: string) {
  return Expose({ name });
}
