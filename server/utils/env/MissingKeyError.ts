export default class MissingKeyError extends Error {
  constructor(readonly key: string) {
    super(`Missing "${key}" on environment variables.\n\nPlease add it to start.`);
  }
}
