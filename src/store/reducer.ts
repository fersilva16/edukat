import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default persistReducer(
  {
    key: 'root',
    storage,
    whitelist: [],
  },
  combineReducers({}),
);
