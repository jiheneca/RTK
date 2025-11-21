
import { configureStore } from '@reduxjs/toolkit';
import { rickAndMortyApi } from '../api/rickAndMortyApi';
import favoritesReducer from './favoritesSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'], 
};


import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
     
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rickAndMortyApi.middleware),
});

export const persistor = persistStore(store);
