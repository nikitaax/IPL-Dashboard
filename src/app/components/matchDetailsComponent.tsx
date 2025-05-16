"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";
import { Match } from "../types/Match";

const PAGE_SIZE = 8;

export default function MatchDetailsContent() {
  const { fixtures, status, error } = useSelector(
    (state: RootState) => state.fixtures
  );
  const [page, setPage] = useState(1);

  if (status === "loading") {
    return (
      <div className="p-4 border bg-white/30 backdrop-blur-md rounded-lg shadow-md text-center">
        <p className="text-lg font-bold text-gray-700">Loading Matches...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="p-4 border bg-white/30 backdrop-blur-md rounded-lg shadow-md text-center">
        <p className="text-lg font-bold text-red-600">Error: {error}</p>
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(fixtures.length / PAGE_SIZE);
  const paginatedFixtures = fixtures.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
          Match Schedule
        </span>
      </h2>

      {/* Desktop Table */}
      <div className="relative overflow-x-auto hidden md:block shadow-2xl rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
        <table className="w-full text-base text-center">
          <thead className="text-lg font-bold uppercase bg-gradient-to-r from-sky-300 via-pink-200 to-yellow-200 text-gray-700">
            <tr>
              <th className="p-4">Match No</th>
              <th className="p-4">Venue</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th colSpan={2} className="p-4 whitespace-nowrap">
                Team 1
              </th>
              <th colSpan={2} className="p-4 whitespace-nowrap">
                Team 2
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-50 text-gray-800 text-lg">
            {paginatedFixtures.map((match: Match, index: number) => (
              <tr
                key={index}
                className="transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-100/60 hover:to-yellow-100/60"
              >
                <td className="p-4 font-semibold">{match.match_number}</td>
                <td className="p-4">{match.venue}</td>
                <td className="p-4">{match.date}</td>
                <td className="p-4">{match.time}</td>
                <td>
                  {match.team1_logo ? (
                    <Image
                      src={match.team1_logo}
                      alt={`${match.team1} Logo`}
                      width={36}
                      height={36}
                      className="rounded-full shadow"
                    />
                  ) : (
                    <span>No Logo</span>
                  )}
                </td>
                <td className="p-4 font-bold">{match.team1}</td>
                <td>
                  {match.team2_logo ? (
                    <Image
                      src={match.team2_logo}
                      alt={`${match.team2} Logo`}
                      width={36}
                      height={36}
                      className="rounded-full shadow"
                    />
                  ) : (
                    <span>No Logo</span>
                  )}
                </td>
                <td className="p-4 font-bold">{match.team2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards Layout */}
      <div className="grid gap-4 sm:grid-cols-1 md:hidden mt-4">
        {paginatedFixtures.map((match: Match, index: number) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-xl bg-white/20 backdrop-blur-md border border-white/30 hover:scale-105 transition-transform duration-300"
          >
            <p className="text-base text-gray-700 mb-2 font-semibold">
              {match.date} | {match.time}
            </p>
            <div className="flex items-center justify-center gap-3 mb-2">
              {match.team1_logo ? (
                <Image
                  src={match.team1_logo}
                  alt={`${match.team1} Logo`}
                  width={32}
                  height={32}
                  className="rounded-full shadow"
                />
              ) : (
                <span>No Logo</span>
              )}
              <span className="font-bold text-lg">{match.team1}</span>
              <span className="mx-2 text-gray-700 font-bold text-lg">vs</span>
              <span className="font-bold text-lg">{match.team2}</span>
              {match.team2_logo ? (
                <Image
                  src={match.team2_logo}
                  alt={`${match.team2} Logo`}
                  width={32}
                  height={32}
                  className="rounded-full shadow"
                />
              ) : (
                <span>No Logo</span>
              )}
            </div>
            <p className="text-base text-blue-700 font-semibold text-center">
              {match.venue}
            </p>
            <p className="text-sm text-gray-400 text-center">
              Match #{match.match_number}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          className="px-4 py-2 rounded-full text-lg bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold shadow hover:scale-105 transition disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="font-semibold text-gray-800 text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 rounded-full text-lg bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold shadow hover:scale-105 transition disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
