import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createStore, applyMiddleware } from "redux";
import bookSlice from "../features/books/bookSlice";
import thunkMiddleware from "redux-thunk";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookApi } from "../api/bookApi";

export const store = configureStore({
  reducer: {
    //[bookApi.reducerPath]: bookApi.reducer,
    book: bookSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(bookApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
