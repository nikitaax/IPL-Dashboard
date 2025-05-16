import React from "react";
import { initializeStore } from "../store";
import ReduxProvider from "../reduxProvider";
import { fetchPoints } from "../services/fetchPoints";
import Points from "../components/Points";

export default async function PointsTable() {
  const store = initializeStore();

  await store.dispatch(
    fetchPoints() as unknown as ReturnType<typeof fetchPoints>
  );

  const preloadedState = store.getState();

  return (
    <ReduxProvider preloadedState={preloadedState}>
      <Points />
    </ReduxProvider>
  );
}
