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
import PaymentSlice from '../Slices/payment-slice';

const loginPersistConfig = {
  key: 'login',
  storage,
  whitelist: ['token', 'role', 'username', 'id', 'email', 'customerId'],
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const reducers = combineReducers({
  login: persistReducer(loginPersistConfig, LoginSlice),
  fetch: FetchSlice,
  order: OrderSlice,
  cart: CartSlice,
  dashboard: DashboardSlice,
  notification: NotificationSlice,
  payment: PaymentSlice,
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
