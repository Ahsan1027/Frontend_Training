import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import LoginSlice from '../Slices/auth-slice';
import FetchSlice from '../Slices/products-slice';
import OrderSlice from '../Slices/order-slice';
import CartSlice from '../Slices/user-cart-slice';
import DashboardSlice from '../Slices/dashboard-slice';
import NotificationSlice from '../Slices/notification-slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'login',]
};

const reducers = combineReducers({
  login: LoginSlice,
  fetch: FetchSlice,
  order: OrderSlice,
  cart: CartSlice,
  dashboard: DashboardSlice,
  notification: NotificationSlice,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
  devTools: true
});