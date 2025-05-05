import Image from "next/image";
import { Match } from "../types/Match";
import fetchData from "../services/FetchData";

export default async function MatchDetails() {
  const data = await fetchData();

  if (!data || !Array.isArray(data.fixtures) || data.fixtures.length === 0) {
    return (
      <div className="p-4 border bg-white rounded-lg shadow-md text-center">
        <p className="text-lg font-bold text-gray-700">No Upcoming Matches</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-lg md:text-xl font-bold text-center mb-4">
        Schedule
      </h2>

      {/* Mobile-Friendly Table */}
      <div className="relative overflow-x-auto hidden md:block shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-s text-gray-700 uppercase bg-sky-300 dark:bg-sky-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" p-2">
                Match No
              </th>
              <th className=" p-2">Venue</th>
              <th className=" p-2">Date</th>
              <th className=" p-2">Time</th>
              <th colSpan={2} className=" p-2">
                Team 1
              </th>
              <th colSpan={2} className=" p-2">
                Team 2
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-100 text-gray-700">
            {data.fixtures.map((match: Match, index: number) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 dark:border-gray-700  hover:bg-sky-50 dark:hover:bg-gray-600"
              >
                <td className=" p-2">{match.match_number}</td>
                <td className=" p-2">{match.venue}</td>
                <td className=" p-2">{match.date}</td>
                <td className=" p-2">{match.time}</td>
                <td>
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
                </td>
                <td className=" p-2 font-bold">{match.team1}</td>

                <td>
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
                </td>
                <td className=" p-2 font-bold ">{match.team2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards Layout */}
      <div className="grid gap-4 sm:grid-cols-1 md:hidden ">
        {data.fixtures.map((match: Match, index: number) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
            <p className="text-sm text-gray-500">
              {match.date} | {match.time}
            </p>
            <h3 className="text-lg font-bold text-gray-700">
              {match.team1} vs {match.team2}
            </h3>
            <p className="text-lg font-bold text-gray-700">
              {match.team1_logo ? (
                <Image
                  src={match.team1_logo}
                  alt={`${match.team1} Logo`}
                  width={20}
                  height={20}
                />
              ) : (
                <span>No Logo</span>
              )}
              vs
              {match.team2_logo ? (
                <Image
                  src={match.team2_logo}
                  alt={`${match.team2} Logo`}
                  width={20}
                  height={20}
                />
              ) : (
                <span>No Logo</span>
              )}
            </p>
            <p className="text-sm"> {match.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
