import { ThunkAction, configureStore, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import TweetReducer from './tweet';
import AuthReducer from './auth';

const useMiddleware = [logger];

export const store = configureStore({
  reducer: {
    tweet: TweetReducer,
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(...useMiddleware),
  devTools: process.env.NODE_ENV !== 'production' ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
