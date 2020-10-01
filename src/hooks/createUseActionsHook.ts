import { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

export default function createUseActionsHook<T extends ActionCreatorsMapObject<any>>(actions: T) {
  return () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
  };
}
