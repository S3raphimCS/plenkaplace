import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import favouritesReducer from './slices/favouritesSlice';
import orderReducer from './slices/orderSlice';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const secretKey = 'plenka-good-truth';

const encryptor = encryptTransform({
  secretKey,
});

const cartPersistConfig = {
  key: 'cart',
  storage,
  transforms: [encryptor],
};

const favouritesPersistConfig = {
  key: 'favourites',
  storage,
  transforms: [encryptor],
};

const orderPersistConfig = {
  key: 'order',
  storage,
  transforms: [encryptor],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedFavouritesReducer = persistReducer(
  favouritesPersistConfig,
  favouritesReducer
);
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    favourites: persistedFavouritesReducer,
    order: persistedOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
