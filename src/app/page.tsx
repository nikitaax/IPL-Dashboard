import MatchCard from "./components/matchCard";
import ImageSlider from "./components/imageSlider";
import { initializeStore } from "./store";
import ReduxProvider from "./reduxProvider";
import { fetchFixtures } from "./services/FetchData";

export default async function Home() {
  const store = initializeStore();

  // Dispatch the fetchFixtures thunk on the server
  await store.dispatch(
    fetchFixtures() as unknown as ReturnType<typeof fetchFixtures>
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
      <div className="flex flex-col md:flex-row">
        <ImageSlider />
        <ReduxProvider preloadedState={preloadedState}>
          <MatchCard />
        </ReduxProvider>
      </div>
    </div>
  );
}
