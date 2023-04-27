import {createStore} from 'redux';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './rootReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 5000,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export let storeRedux = createStore(persistedReducer, applyMiddleware(thunk));
export let persistorRedux = persistStore(storeRedux);
