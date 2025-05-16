import { configureStore } from "@reduxjs/toolkit";
import fixturesReducer from "./services/FetchData";

export function initializeStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      fixtures: fixturesReducer,
    },
    preloadedState,
  });
}

export type RootState = ReturnType<
  ReturnType<typeof initializeStore>["getState"]
>;
export type AppDispatch = ReturnType<
  ReturnType<typeof initializeStore>["dispatch"]
>;
