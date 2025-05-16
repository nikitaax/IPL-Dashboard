import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar";
import "./assets/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IPL Dashboard",
  description: "Get the latest updates about IPL 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen bg-[url('/background.png')] bg-cover bg-center">
          {/* Vibrant gradient overlay with glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/60 via-pink-200/60 to-purple-200/60 backdrop-blur-xl z-0" />
          {/* Optional: add a subtle white overlay for extra brightness */}
          <div className="absolute inset-0 bg-white/20 z-0" />
          <div className="relative z-10">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
