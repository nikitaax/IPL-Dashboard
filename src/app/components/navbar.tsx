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
    <nav className="bg-sky-600 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="cursor-pointer text-xl font-bold " onClick={handleClick}>
          IPL Dashboard
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
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
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/match" className="hover:text-gray-300">
              Live or Upcoming Match
            </Link>
          </li>
          <li>
            <Link href="/pointsTable" className="hover:text-gray-300">
              Points Table
            </Link>
          </li>
          <li>
            <Link href="/schedule" className="hover:text-gray-300">
              Schedule
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-3 space-y-3">
          <li>
            <Link href="#" className="block text-center hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/match"
              className="block text-center hover:text-gray-300"
            >
              Live or Upcoming Match
            </Link>
          </li>
          <li>
            <Link
              href="/pointsTable"
              className="block text-center hover:text-gray-300"
            >
              Points Table
            </Link>
          </li>
          <li>
            <Link
              href="/schedule"
              className="block text-center hover:text-gray-300"
            >
              Schedule
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
