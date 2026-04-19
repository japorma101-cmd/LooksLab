import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "LooksLab",
  description: "AI appearance analysis and improvement tracking",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <header className="border-b border-white/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              LooksLab
            </Link>
            <nav className="flex gap-4 text-sm text-gray-300">
              <Link href="/upload">Scan</Link>
              <Link href="/learn">Learn</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/login">Login</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}