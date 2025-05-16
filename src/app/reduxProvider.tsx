"use client";

import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { initializeStore } from "./store";

export default function ReduxProvider({
  children,
  preloadedState = {},
}: PropsWithChildren<{ preloadedState?: Record<string, unknown> }>) {
  const store = initializeStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
}
