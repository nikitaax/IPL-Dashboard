"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";
import { Match } from "../types/Match";

export default function MatchCard() {
  const { fixtures, status, error } = useSelector(
    (state: RootState) => state.fixtures
  );

  if (status === "loading") {
    return (
      <div className="p-4 border bg-white rounded-lg shadow-md text-center">
        <p className="text-lg font-bold text-gray-700">No Upcoming Matches</p>
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
    <div className="grid gap-6 grid-cols-1 p-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
          Upcoming Matches
        </span>
      </h2>
      {fixtures.slice(0, 5).map((match: Match, index: number) => (
        <div
          key={index}
          className="rounded-xl shadow-xl p-6 bg-white/10 backdrop-blur-md border border-white/30
                     hover:scale-105 transition-transform duration-300
                     hover:bg-gradient-to-br hover:from-purple-200/40 hover:to-yellow-100/40
                     flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-2 w-full justify-between">
            <span
              className={
                match.live_match
                  ? "font-bold text-red-600 animate-bounce"
                  : "hidden"
              }
            >
              LIVE
            </span>
            <span
              className={match.status ? "font-bold text-yellow-600" : "hidden"}
            >
              {match.status ? match.status.toLocaleUpperCase() : ""}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {match.date} | {match.time}
          </p>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex flex-col items-center">
              {match.team1_logo ? (
                <Image
                  src={match.team1_logo}
                  alt={`${match.team1} Logo`}
                  width={40}
                  height={40}
                  className="rounded-full shadow-md"
                />
              ) : (
                <span className="text-xs text-gray-400">No Logo</span>
              )}
              <span className="text-xs font-semibold mt-1">{match.team1}</span>
            </div>
            <span className="text-lg font-bold text-gray-700">vs</span>
            <div className="flex flex-col items-center">
              {match.team2_logo ? (
                <Image
                  src={match.team2_logo}
                  alt={`${match.team2} Logo`}
                  width={40}
                  height={40}
                  className="rounded-full shadow-md"
                />
              ) : (
                <span className="text-xs text-gray-400">No Logo</span>
              )}
              <span className="text-xs font-semibold mt-1">{match.team2}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{match.venue}</p>
        </div>
      ))}
    </div>
  );
}
