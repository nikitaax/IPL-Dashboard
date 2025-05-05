import Image from "next/image";
import { Match } from "../types/Match";
import fetchData from "../services/FetchData";

export default async function MatchDetails() {
  const data = await fetchData();
  if (!data || data.length === 0) {
    return (
      <div className="p-4 border bg-white rounded-lg shadow-md text-center">
        <p className="text-lg font-bold text-gray-700">No Upcoming Matches</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-lg md:text-xl font-bold text-center mb-4">
        Upcoming and Next Match
      </h2>

      {/* Mobile-Friendly Table */}
      <div className="grid gap-4  md:grid-cols-1">
        {data.fixtures.slice(0, 2).map((match: Match, index: number) => (
          <div
            key={index}
            className={`p-4 border flex flex-col rounded-lg shadow-md ${
              match.live ? "bg-sky-100" : "bg-white"
            }`}
          >
            <p
              className={
                match.live ? "font-bold text-red-600 animate-bounce" : "hidden"
              }
            >
              LIVE
            </p>
            <p
              className={match.status ? "font-bold text-yellow-600 " : "hidden"}
            >
              {match.status ? match.status.toLocaleUpperCase() : ""}
            </p>
            <p className="text-sm text-gray-500">
              {match.date} | {match.time}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                {match.team1_logo ? (
                  <Image
                    src={match.team1_logo}
                    alt={`${match.team1} Logo`}
                    width={30}
                    height={30}
                  />
                ) : (
                  <span>No Logo</span>
                )}{" "}
                {match.team1}
              </div>

              <div className={match?.team1_status ? "justify-between  " : ""}>
                {match.team1_status}
              </div>
              <div className="flex items-center gap-2">
                {match.team2_logo ? (
                  <Image
                    src={match.team2_logo}
                    alt={`${match.team2} Logo`}
                    width={30}
                    height={30}
                  />
                ) : (
                  <span>No Logo</span>
                )}{" "}
                {match.team2}
              </div>

              <div className={match.team2_status ? "justify-right " : ""}>
                {match.team2_status}
              </div>
            </div>

            <p className="text-sm"> {match.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
