"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Team } from "../types/Team";

export default function TopTeams() {
  const TEAM_CODE_TO_NAME: Record<string, string> = {
    CSK: "Chennai Super Kings",
    MI: "Mumbai Indians",
    RCB: "Royal Challengers Bengaluru",
    KKR: "Kolkata Knight Riders",
    DC: "Delhi Capitals",
    RR: "Rajasthan Royals",
    SRH: "Sunrisers Hyderabad",
    PBKS: "Punjab Kings",
    LSG: "Lucknow Super Giants",
    GT: "Gujarat Titans",
    TBD: "TBD",
  };

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
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 p-10 justify-items-stretch">
      <h2 className="text-2xl font-bold text-center mb-6 col-span-1 md:col-span-3">
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
          Top Teams
        </span>
      </h2>
      {table.slice(0, 3).map((team: Team, index: number) => (
        <div
          key={index}
          className="h-full flex flex-col items-center justify-center rounded-xl shadow-xl p-6
                   bg-white/10 backdrop-blur-md border border-white/30
                   hover:scale-105 transition-transform duration-300
                   hover:bg-gradient-to-br hover:from-purple-200/40 hover:to-yellow-100/40"
        >
          <h3 className="text-2xl font-extrabold text-gray-800 text-center mb-2 drop-shadow">
            {team.position}{" "}
            {TEAM_CODE_TO_NAME[team.team_name] || team.team_name}
          </h3>
          <p className="text-lg font-semibold text-gray-700 mb-1">
            Points: <span className="text-purple-600">{team.points}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
