import React from "react";
import { initializeStore } from "../store";
import ReduxProvider from "../reduxProvider";
import { fetchPoints } from "../services/fetchPoints";
import Points from "../components/Points";

export default async function PointsTable() {
  const store = initializeStore();

  // Pass required arguments to fetchPoints if any, e.g., fetchPoints(arg1, arg2)
  await store.dispatch(
    fetchPoints() as unknown as ReturnType<typeof fetchPoints>
  );

  // Get the preloaded state from the store
  const preloadedState = store.getState();

  // Access the points data from the store's state
  const data = preloadedState.points;
  if (!data || !Array.isArray(data.table) || data.table.length === 0) {
    return <div className="text-center">No data available</div>;
  }
  return (
    <ReduxProvider preloadedState={preloadedState}>
      <Points />
    </ReduxProvider>
  );
}
