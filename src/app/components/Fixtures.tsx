"use client";

import Image from "next/image";
import { Match } from "../types/Match";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// Fix: robustly parse "MAY, SAT 17" and "7:30 pm IST"
function getTimeUntil(dateStr: string, timeStr: string) {
  try {
    // Example: dateStr = "MAY, SAT 17", timeStr = "7:30 pm IST"
    const [monthRaw, , dayRaw] = dateStr.replace(",", "").split(" ");
    const month =
      monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1).toLowerCase(); // "MAY" -> "May"
    const day = dayRaw;
    // Remove "IST" and trim
    const timeClean = timeStr.replace("IST", "").trim();
    // Parse to 24h format
    const [time, period] = timeClean.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period.toLowerCase() === "pm" && hours !== 12) hours += 12;
    if (period.toLowerCase() === "am" && hours === 12) hours = 0;

    // Use current year (or adjust as needed)
    const year = new Date().getFullYear();
    // Build ISO string: "YYYY-MM-DDTHH:mm:00"
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const monthNum = monthMap[month.slice(0, 3)];
    const isoString = `${year}-${monthNum}-${day.padStart(2, "0")}T${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;

    const matchDate = new Date(isoString);
    const now = new Date();
    const diff = matchDate.getTime() - now.getTime();
    if (isNaN(diff)) return "Invalid date/time";
    if (diff <= 0) return "Starting soon!";
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minsLeft = Math.floor((diff / (1000 * 60)) % 60);
    const secsLeft = Math.floor((diff / 1000) % 60);
    return `${hoursLeft}h ${minsLeft}m ${secsLeft}s`;
  } catch {
    return "Invalid date/time";
  }
}

export default function Fixtures() {
  const { fixtures, status, error } = useSelector(
    (state: RootState) =>
      state.fixtures as {
        fixtures: Match[];
        status: string;
        error: string | null;
      }
  );
  const [timer, setTimer] = useState("");

  // Update timer for the next match
  useEffect(() => {
    if (fixtures && fixtures.length > 0) {
      const update = () => {
        setTimer(getTimeUntil(fixtures[0].date, fixtures[0].time));
      };
      update();
      const interval = setInterval(update, 1000);
      return () => clearInterval(interval);
    }
  }, [fixtures]);

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
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6">
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
          Upcoming and Next Match
        </span>
      </h2>
      <div className="grid gap-6 md:grid-cols-1">
        {fixtures.slice(0, 2).map((match: Match, index: number) => (
          <div
            key={index}
            className={`rounded-xl shadow-xl p-6 bg-white/10 backdrop-blur-md border border-white/30
              hover:scale-105 transition-transform duration-300
              hover:bg-gradient-to-br hover:from-purple-200/40 hover:to-yellow-100/40
              flex flex-col`}
          >
            <div className="flex items-center justify-between mb-2">
              <p
                className={
                  match.live_match
                    ? "font-bold text-red-600 animate-bounce"
                    : "hidden"
                }
              >
                LIVE
              </p>
              <p
                className={
                  match.status ? "font-bold text-yellow-600" : "hidden"
                }
              >
                {match.status ? match.status.toLocaleUpperCase() : ""}
              </p>
            </div>
            <p className="text-orange-500 py-2 text-center font-semibold">
              {match.date} | {match.time}
            </p>
            {index === 0 && (
              <p className="text-center text-blue-700 font-bold mb-2">
                ⏰ {timer}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4 items-center mb-2">
              <div className="flex flex-col items-center">
                {match.team1_logo ? (
                  <Image
                    src={match.team1_logo}
                    alt={`${match.team1} Logo`}
                    width={40}
                    height={40}
                    className="rounded-full shadow"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Logo</span>
                )}
                <span className="font-bold mt-1">{match.team1}</span>
                <span className="text-xs text-gray-500">
                  {match.team1_status}
                </span>
              </div>
              <div className="flex flex-col items-center">
                {match.team2_logo ? (
                  <Image
                    src={match.team2_logo}
                    alt={`${match.team2} Logo`}
                    width={40}
                    height={40}
                    className="rounded-full shadow"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Logo</span>
                )}
                <span className="font-bold mt-1">{match.team2}</span>
                <span className="text-xs text-gray-500">
                  {match.team2_status}
                </span>
              </div>
            </div>
            <p className="text-blue-700 font-bold py-2 font-mono text-center">
              {match.venue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
