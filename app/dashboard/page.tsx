"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("looksLabHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  function extractFaceScore(scan: string) {
    const match = scan.match(/Face Score:\s*(\d+(\.\d+)?)/i);
    return match ? parseFloat(match[1]) : null;
  }

  function extractBodyScore(scan: string) {
    const match = scan.match(/Body Score:\s*(\d+(\.\d+)?)/i);
    return match ? parseFloat(match[1]) : null;
  }

  function extractSuggestions(scan: string) {
    const section = scan.split("Suggestions:")[1];
    if (!section) return [];
    return section
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-"))
      .map((line) => line.replace("-", "").trim())
      .slice(0, 4);
  }

  const latestScan = history[0] || "";
  const latestFace = latestScan ? extractFaceScore(latestScan) : null;
  const latestBody = latestScan ? extractBodyScore(latestScan) : null;
  const latestSuggestions = latestScan ? extractSuggestions(latestScan) : [];

  return (
    <main className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
            Dashboard
          </p>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
            Your LooksLab Dashboard
          </h1>

          <p className="mt-4 text-gray-300 max-w-2xl">
            See your latest results, track your progress, and jump back into a new scan.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <h2 className="text-2xl font-bold">No dashboard data yet</h2>
            <p className="mt-3 text-gray-400">
              Upload your first scan to start building your LooksLab dashboard.
            </p>

            <a
              href="/upload"
              className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white hover:opacity-90 transition"
            >
              Upload First Scan
            </a>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-gray-400">Latest Face Score</p>
                <p className="mt-3 text-4xl font-bold">
                  {latestFace !== null ? latestFace.toFixed(1) : "--"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-gray-400">Latest Body Score</p>
                <p className="mt-3 text-4xl font-bold">
                  {latestBody !== null ? latestBody.toFixed(1) : "--"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-gray-400">Total Scans</p>
                <p className="mt-3 text-4xl font-bold">{history.length}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-bold">Quick Actions</h2>

                <div className="mt-6 flex flex-col gap-4">
                  <a
                    href="/upload"
                    className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4 font-semibold text-white text-center hover:opacity-90 transition"
                  >
                    Upload New Scan
                  </a>

                  <a
                    href="/pricing"
                    className="rounded-2xl border border-white/20 px-6 py-4 font-semibold text-white text-center hover:bg-white/10 transition"
                  >
                    Upgrade Plan
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-bold">Latest Focus Areas</h2>

                <ul className="mt-6 space-y-3 text-gray-300">
                  {latestSuggestions.length > 0 ? (
                    latestSuggestions.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))
                  ) : (
                    <li>• No suggestions found yet</li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}