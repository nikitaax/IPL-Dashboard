import { configureStore } from "@reduxjs/toolkit";
import fixturesReducer from "./services/FetchData";
import pointsReducer from "./services/fetchPoints"; // <-- import your points reducer

export function initializeStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      fixtures: fixturesReducer,
      points: pointsReducer,
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
