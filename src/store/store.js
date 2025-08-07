import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import notificationsReducer from './slices/notificationSlice';
import  authReducer from './slices/authSlice';
import  productReducer from './slices/productSlice';

const rootReducer = combineReducers({
  auth: authReducer, // Pass the reducer
  product: productReducer, // Pass the reducer
  notifications: notificationsReducer, // Pass the reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['notifications','auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
