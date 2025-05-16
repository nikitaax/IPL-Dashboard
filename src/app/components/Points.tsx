"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Team } from "../types/Team";

export default function Points() {
  const { table, status, error } = useSelector(
    (state: RootState) => state.points
  );

  if (status === "loading") {
    return (
      <div className="p-4 border bg-white rounded-lg shadow-md text-center">
        <p className="text-lg font-bold text-gray-700">No Data</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="p-4 border bg-white rounded-lg shadow-md text-center">
        <p className="text-lg font-bold text-gray-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 p-4 max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6">
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
          IPL Points Table
        </span>
      </h2>
      <div className="relative overflow-x-auto rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30">
        <table className="table-auto w-full text-sm text-center">
          <thead className="text-xs font-bold uppercase bg-gradient-to-r from-sky-300 via-pink-200 to-yellow-200 text-gray-700">
            <tr>
              <th className="p-2">Rank</th>
              <th className="p-2">Team</th>
              <th className="p-2">Played</th>
              <th className="p-2">Wins</th>
              <th className="p-2">Losses</th>
              <th className="p-2">No Result</th>
              <th className="p-2">NRR</th>
              <th className="p-2 hidden md:table-cell">For</th>
              <th className="p-2 hidden md:table-cell">Against</th>
              <th className="p-2">Points</th>
              <th className="p-2 hidden md:table-cell">Recent</th>
            </tr>
          </thead>
          <tbody>
            {table.map((team: Team, index: number) => (
              <tr
                key={index}
                className="transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-100/60 hover:to-yellow-100/60"
              >
                <td className="p-2 font-bold">{team.position}</td>
                <td className="p-2 font-semibold flex items-center gap-2 justify-center">
                  {team.team_name}
                </td>
                <td className="p-2">{team.played}</td>
                <td className="p-2 text-green-700 font-bold">{team.won}</td>
                <td className="p-2 text-red-700 font-bold">{team.lost}</td>
                <td className="p-2">{team.no_result}</td>
                <td className="p-2">{team.nrr}</td>
                <td className="p-2 hidden md:table-cell">{team.for}</td>
                <td className="p-2 hidden md:table-cell">{team.against}</td>
                <td className="p-2 font-bold text-sky-700">{team.points}</td>
                <td className="p-2 font-bold hidden md:table-cell">
                  {team.recent.split("").map((char, i) => (
                    <span
                      key={i}
                      className={
                        char === "W"
                          ? "text-green-500"
                          : char === "L"
                          ? "text-red-500"
                          : ""
                      }
                    >
                      {char}
                      <span className="text-gray-400"> </span>
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
