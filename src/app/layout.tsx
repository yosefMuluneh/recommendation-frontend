import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Recommender",
  description: "AI powered movie recommendation app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  


  return (
    <html lang="en" className={inter.className}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex-col` }>
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow md:px-6 ">
          <h1 className="text-xl md:text-2xl font-bold">Movie Recommender</h1>
          <ThemeToggle />
        </header>
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}

