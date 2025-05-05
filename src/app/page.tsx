import MatchCard from "./components/matchCard";
import ImageSlider from "./components/imageSlider";

export default function Home() {
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
        <MatchCard />
      </div>
    </div>
  );
}
