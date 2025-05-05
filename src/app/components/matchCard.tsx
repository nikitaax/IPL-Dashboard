import { Match } from "../types/Match";
import fetchData from "../services/FetchData";
import Image from "next/image";

export default async function MatchCard() {
  const data = await fetchData();

  if (!data || data.length === 0) {
    return (
      <div className="p-4 border bg-white rounded-lg shadow-md text-center">
        <p className="text-lg font-bold text-gray-700">No Upcoming Matches</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 p-10 flex flex-col md:grid-cols-1 lg:grid-cols-1">
      <h2 className="text-2xl font-bold text-center mb-6 ">
        <span className="bg-white/50 backdrop-blur-md">Upcoming Matches</span>
      </h2>
      {data.fixtures.slice(0, 5).map((match: Match, index: number) => (
        <div key={index} className="p-4 border bg-white rounded-lg shadow-md">
          <p
            className={
              match.live ? "font-bold text-red-600 animate-bounce" : "hidden"
            }
          >
            LIVE
          </p>
          <p className={match.status ? "font-bold text-yellow-600 " : "hidden"}>
            {match.status ? match.status.toLocaleUpperCase() : ""}
          </p>
          <p className="text-sm text-gray-500">
            {match.date} | {match.time}
          </p>
          <h3 className="text-lg font-bold text-gray-700">
            {match.team1} vs {match.team2}
          </h3>
          <span className="text-lg font-bold text-gray-700 flex items-center gap-5">
            {match.team1_logo ? (
              <Image
                src={match.team1_logo}
                alt={`${match.team1} Logo`}
                width={25}
                height={25}
              />
            ) : (
              <span>No Logo</span>
            )}
            vs
            {match.team2_logo ? (
              <Image
                src={match.team2_logo}
                alt={`${match.team2} Logo`}
                width={25}
                height={25}
              />
            ) : (
              <span>No Logo</span>
            )}
          </span>
          <p className="text-sm"> {match.venue}</p>
        </div>
      ))}
    </div>
  );
}
