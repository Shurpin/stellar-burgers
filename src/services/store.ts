import { configureStore } from '@reduxjs/toolkit';
import tracksSliceReducer from '../slices/ingredientsSlice';
import burgerConstructorSliceReducer from '../slices/burgerConstructorSlice';
import feedSliceReducer from '../slices/feedSlice';
import orderSliceReducer from '../slices/orderSlice';
import userSliceReducer from '../slices/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const store = configureStore({
  reducer: {
    ingredients: tracksSliceReducer,
    burgerConstructor: burgerConstructorSliceReducer,
    feed: feedSliceReducer,
    order: orderSliceReducer,
    user: userSliceReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
