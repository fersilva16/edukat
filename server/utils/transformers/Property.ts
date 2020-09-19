import { Expose } from 'class-transformer';

export type PropertyOptions = {
  outOnly?: boolean;
  inOnly?: boolean;
};

export default function Property(name: string, options: PropertyOptions = {}) {
  return Expose({
    name,
    toClassOnly: options.inOnly,
    toPlainOnly: options.outOnly,
  });
}
