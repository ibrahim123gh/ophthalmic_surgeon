import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import clinicSettingsReducer from "./clinicSettingsSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    clinicSettings: clinicSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
