import Navbar from "./components/navbar";
import "./assets/globals.css";

export const metadata = {
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
      <body>
        <div className="bg-[url('/background.png')] bg-cover bg-center min-h-screen ">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
