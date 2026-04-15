import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LooksLab",
  description: "AI appearance analysis and progress tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
          <div className="fixed w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full top-[-120px] left-[-120px] pointer-events-none" />
          <div className="fixed w-[450px] h-[450px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-120px] pointer-events-none" />

          <nav className="relative z-20 w-full border-b border-white/10 backdrop-blur-md bg-black/40">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
              <a href="/" className="text-2xl font-extrabold tracking-tight">
                LooksLab
              </a>

              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-300">
                <a href="/onboarding" className="hover:text-white transition">
                  Onboarding
                </a>
                <a href="/upload" className="hover:text-white transition">
                  Upload
                </a>
                <a href="/pricing" className="hover:text-white transition">
                  Pricing
                </a>
                <a href="/progress" className="hover:text-white transition">
                  Progress
                </a>
                <a href="/dashboard" className="hover:text-white transition">
                  Dashboard
                </a>
                <a href="/faq" className="hover:text-white transition">
                  FAQ
                </a>
                <a href="/settings" className="hover:text-white transition">
                  Settings
                </a>
                <a
                  href="/login"
                  className="rounded-xl border border-white/20 px-4 py-2 text-white hover:bg-white/10 transition"
                >
                  Login
                </a>
              </div>
            </div>
          </nav>

          <div className="relative z-10">{children}</div>

          <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/30 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <p>© 2026 LooksLab. All rights reserved.</p>

              <div className="flex flex-wrap items-center gap-5">
                <a href="/pricing" className="hover:text-white transition">
                  Pricing
                </a>
                <a href="/faq" className="hover:text-white transition">
                  FAQ
                </a>
                <a href="/settings" className="hover:text-white transition">
                  Settings
                </a>
                <a href="/login" className="hover:text-white transition">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}