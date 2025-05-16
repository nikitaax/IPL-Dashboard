import { initializeStore } from "../store";
import ReduxProvider from "../reduxProvider";
import { fetchFixtures } from "../services/FetchData";
import MatchDetailsContent from "../components/matchDetailsComponent";

export default async function MatchDetails() {
  const store = initializeStore();

  // Dispatch the fetchFixtures thunk on the server
  await store.dispatch(
    fetchFixtures() as unknown as ReturnType<typeof fetchFixtures>
  );

  // Get the preloaded state from the store
  const preloadedState = store.getState();

  return (
    <ReduxProvider preloadedState={preloadedState}>
      <MatchDetailsContent />
    </ReduxProvider>
  );
}
