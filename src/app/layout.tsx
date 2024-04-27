import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "~/components/Footer";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable} flex flex-col`}>
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
