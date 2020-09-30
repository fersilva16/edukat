import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export default function createUseActionsHook<T extends ActionCreatorsMapObject<any>>(actions: T) {
  return () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
  };
}
