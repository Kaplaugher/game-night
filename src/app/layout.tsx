import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Game Night",
  description: "A website for organizing game nights with friends.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} flex flex-col gap-4`}>
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
