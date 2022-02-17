import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { persistStore } from 'redux-persist';
import { StoreType } from '../types/Playlist';

let store: StoreType;
const isClient = typeof window !== 'undefined';

if (isClient) {
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'root',
    storage
  };

  store = createStore(persistReducer(persistConfig, rootReducer));

  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(rootReducer);
}

export default store;
