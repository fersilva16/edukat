import { ActionCreatorsMapObject } from 'redux';
import { put } from 'redux-saga/effects';

export default function createSagaActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  return new Proxy(actions, {
    get(target, property: string) {
      return target[property] ? (...args: any[]) => put(target[property](...args)) : null;
    },
  });
}
