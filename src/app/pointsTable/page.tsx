import React from "react";
import { Team } from "../types/Team";
import fetchPoints from "../services/fetchPoints";

export default async function PointsTable() {
  const data = await fetchPoints();
  if (!data || data.length === 0) {
    return <div className="text-center">No data available</div>;
  }
  return (
    <div className="mx-auto mt-10 p-4">
      <h2 className="text-lg md:text-xl font-bold text-center mb-4">
        IPL Points Table
      </h2>
      <div className="relative overflow-x-auto  md:block shadow-md sm:rounded-lg">
        <table className="table-auto w-full text-sm text-center rtl:text-right  dark:text-gray-400">
          <thead className="text-s font-bold uppercase bg-sky-300 dark:bg-sky-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" p-2">
                Rank
              </th>
              <th className=" p-2">Team</th>
              <th className=" p-2">Played</th>
              <th className=" p-2">Wins</th>
              <th className=" p-2">Losses</th>
              <th className=" p-2">No Result</th>
              <th className=" p-2">NRR</th>
              <th className=" p-2 hidden md:table-cell">For</th>
              <th className=" p-2 hidden md:table-cell">Against</th>
              <th className=" p-2">Points</th>
              <th className=" p-2 hidden md:table-cell">Recent</th>
            </tr>
          </thead>
          <tbody className="bg-blue-100 text-gray-700">
            {data.table.map((team: Team, index: number) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 dark:border-gray-700  hover:bg-sky-50 dark:hover:bg-gray-600"
              >
                <td className=" p-2">{team.position}</td>
                <td className=" p-2">{team.team_name}</td>
                <td className=" p-2">{team.played}</td>
                <td className=" p-2">{team.won}</td>
                <td className=" p-2">{team.lost}</td>
                <td className=" p-2">{team.no_result}</td>
                <td className=" p-2">{team.nrr}</td>
                <td className=" p-2 hidden md:table-cell">{team.for}</td>
                <td className=" p-2 hidden md:table-cell">{team.against}</td>
                <td className=" p-2 font-bold text-sky-700">{team.points}</td>
                <td className=" p-2 font-bold hidden md:table-cell">
                  {team.recent.replace(/\n/g, " ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
