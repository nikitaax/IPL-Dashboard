"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <nav className="relative z-20 bg-white/30 backdrop-blur-md shadow-lg rounded-b-2xl mx-2 mt-2">
      <div className="flex justify-between items-center px-4 py-3">
        <h1
          className="cursor-pointer text-2xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-transparent bg-clip-text drop-shadow"
          onClick={handleClick}
        >
          IPL Dashboard
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none transition-transform duration-200 hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 font-semibold">
          <li>
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/match"
              className="hover:text-pink-500 transition-colors"
            >
              Live or Upcoming Match
            </Link>
          </li>
          <li>
            <Link
              href="/pointsTable"
              className="hover:text-yellow-500 transition-colors"
            >
              Points Table
            </Link>
          </li>
          <li>
            <Link
              href="/schedule"
              className="hover:text-purple-600 transition-colors"
            >
              Schedule
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-2 pb-3 px-4 space-y-3 bg-white/80 rounded-xl shadow backdrop-blur-md animate-fade-in-down">
          <li>
            <Link
              href="/"
              className="block text-center font-semibold hover:text-purple-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/match"
              className="block text-center font-semibold hover:text-pink-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Live or Upcoming Match
            </Link>
          </li>
          <li>
            <Link
              href="/pointsTable"
              className="block text-center font-semibold hover:text-yellow-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Points Table
            </Link>
          </li>
          <li>
            <Link
              href="/schedule"
              className="block text-center font-semibold hover:text-purple-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Schedule
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
