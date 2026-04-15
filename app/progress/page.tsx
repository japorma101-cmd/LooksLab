"use client";

import { useEffect, useState } from "react";

export default function ProgressPage() {
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

  const orderedHistory = [...history].reverse();
  const firstScan = orderedHistory[0] || "";
  const latestScan = orderedHistory[orderedHistory.length - 1] || "";

  const firstScore = firstScan ? extractFaceScore(firstScan) : null;
  const latestScore = latestScan ? extractFaceScore(latestScan) : null;

  const improvement =
    firstScore !== null && latestScore !== null
      ? (latestScore - firstScore).toFixed(1)
      : null;

  return (
    <main className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
            Progress Tracking
          </p>

          <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold tracking-tight">
            Track your glow-up over time
          </h1>

          <p className="mt-5 text-lg text-gray-300">
            Compare scans, track your score changes, and see how your appearance
            improves with consistency.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <h2 className="text-2xl font-bold">No scans yet</h2>
            <p className="mt-3 text-gray-400">
              Upload a scan first, then your progress will appear here.
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
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-gray-400">First Face Score</p>
                <p className="mt-3 text-4xl font-bold">
                  {firstScore !== null ? firstScore.toFixed(1) : "--"}
                </p>
                <p className="mt-2 text-sm text-gray-500">Starting point</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-gray-400">Latest Face Score</p>
                <p className="mt-3 text-4xl font-bold">
                  {latestScore !== null ? latestScore.toFixed(1) : "--"}
                </p>
                <p className="mt-2 text-sm text-gray-500">Latest result</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-gray-400">Improvement</p>
                <p className="mt-3 text-4xl font-bold text-green-400">
                  {improvement !== null
                    ? `${Number(improvement) >= 0 ? "+" : ""}${improvement}`
                    : "--"}
                </p>
                <p className="mt-2 text-sm text-gray-500">Overall progress</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-bold">Score Timeline</h2>

                <div className="mt-8 space-y-5">
                  {orderedHistory.map((scan, index) => {
                    const score = extractFaceScore(scan);
                    const width = score ? `${Math.min(score * 10, 100)}%` : "0%";

                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Scan {index + 1}</span>
                          <span>{score !== null ? score.toFixed(1) : "--"}</span>
                        </div>

                        <div className="mt-2 h-3 rounded-full bg-white/10">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                            style={{ width }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-bold">Latest Full Scan</h2>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm whitespace-pre-wrap text-gray-300">
                    {latestScan}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <h2 className="text-3xl font-bold">Keep your streak going</h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                Upload new scans regularly to track changes, stay motivated, and
                build your long-term improvement roadmap.
              </p>

              <a
                href="/upload"
                className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white hover:opacity-90 transition"
              >
                Upload New Scan
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}