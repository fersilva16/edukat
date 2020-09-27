import { defaultMetadataStorage } from 'class-transformer/storage';

export default function createPropertyValidator<T extends (...args: any[]) => any>(Validator: T) {
  return (...args: Parameters<T>) => {
    const validator = Validator(...args);

    return (object: Object, propertyName: string) => {
      const metadata = defaultMetadataStorage.findExposeMetadata(object.constructor, propertyName);

      validator(object, metadata?.options?.name || propertyName);
    };
  };
}
