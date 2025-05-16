import MatchCard from "./components/matchCard";
import ImageSlider from "./components/imageSlider";
import { initializeStore } from "./store";
import ReduxProvider from "./reduxProvider";
import { fetchFixtures } from "./services/FetchData";
import { fetchPoints } from "./services/fetchPoints";

import TopTeams from "./components/TopTeams";

export default async function Home() {
  const store = initializeStore();

  // Dispatch the fetchFixtures thunk on the server
  await store.dispatch(
    fetchFixtures() as unknown as ReturnType<typeof fetchFixtures>
  );

  await store.dispatch(
    fetchPoints() as unknown as ReturnType<typeof fetchPoints>
  );

  const preloadedState = store.getState();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10 ">
        Welcome to IPL Dashboard
      </h1>
      <p className="text-center mt-4">Get the latest updates about IPL 2025</p>

      <p className="text-center mt-4">
        This is a simple dashboard to track IPL matches, points table, and more.
      </p>
      <p className="text-center mt-4">
        Check out the navigation bar to explore different sections.
      </p>
      <ReduxProvider preloadedState={preloadedState}>
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
          <div className="md:row-span-2 md:col-span-1">
            <MatchCard />
          </div>
          <div className="md:col-span-2 md:row-span-1">
            <ImageSlider />
          </div>
          <div className="md:col-span-2 md:row-span-1">
            <TopTeams />
          </div>
        </div>
      </ReduxProvider>
    </div>
  );
}
