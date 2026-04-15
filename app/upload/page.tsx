"use client";

import { useEffect, useState } from "react";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [streak] = useState(3);

  useEffect(() => {
    const saved = localStorage.getItem("looksLabHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  async function handleAnalyze() {
    if (files.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setError("");
    setResult("");
    setUnlocked(false);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const demoResult = `Face Score: 7.8/10
Body Score: 7.2/10

Top Issues:
- Mild skin texture inconsistency
- Slight posture imbalance
- Soft jawline definition
- Under-eye tiredness
- Average shoulder width presentation

Suggestions:
- Improve sleep consistency
- Focus on posture and upper back training
- Build a skincare routine
- Lean down slightly for sharper facial definition
- Improve grooming and hairstyle framing`;

      const newHistory = [demoResult, ...history];
      setResult(demoResult);
      setHistory(newHistory);
      localStorage.setItem("looksLabHistory", JSON.stringify(newHistory));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze");
    } finally {
      setLoading(false);
    }
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem("looksLabHistory");
  }

  let faceScore = "--";
  let bodyScore = "--";
  let issues: string[] = [];
  let suggestions: string[] = [];

  if (result) {
    const faceMatch = result.match(/Face Score:\s*(\d+(\.\d+)?)/i);
    const bodyMatch = result.match(/Body Score:\s*(\d+(\.\d+)?)/i);

    if (faceMatch) faceScore = faceMatch[1];
    if (bodyMatch) bodyScore = bodyMatch[1];

    const issuesSection = result.split("Top Issues:")[1]?.split("Suggestions:")[0];
    const suggestionsSection = result.split("Suggestions:")[1];

    if (issuesSection) {
      issues = issuesSection
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => line.replace("-", "").trim());
    }

    if (suggestionsSection) {
      suggestions = suggestionsSection
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => line.replace("-", "").trim());
    }
  }

  return (
    <main className="relative z-10 px-4 sm:px-6 py-8 sm:py-12">
      <div className="relative z-10 w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <p className="inline-block rounded-full bg-yellow-500/20 px-4 py-1 text-xs uppercase tracking-[0.25em] text-yellow-300">
            Demo Mode Active
          </p>

          <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Upload Your Photos
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-md mx-auto">
            Upload clear face and body photos for your premium AI appearance scan.
          </p>

          <p className="mt-4 text-orange-400 font-medium">
            🔥 {streak}-day improvement streak
          </p>
        </div>

        <div className="mt-8 sm:mt-10 rounded-2xl border-2 border-dashed border-white/20 bg-black/40 p-6 sm:p-10 text-center">
          <input
            id="photo-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || []);
              setFiles(selectedFiles);

              const urls = selectedFiles.map((file) => URL.createObjectURL(file));
              setPreviewUrls(urls);
            }}
            className="hidden"
          />

          <label
            htmlFor="photo-upload"
            className="inline-block cursor-pointer rounded-2xl bg-white px-6 py-4 font-semibold text-black hover:bg-gray-200 transition"
          >
            Choose Photos
          </label>

          <p className="mt-4 text-sm text-gray-400">
            {files.length > 0
              ? `${files.length} photo${files.length > 1 ? "s" : ""} selected`
              : "No photos selected yet"}
          </p>
        </div>

        {previewUrls.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 sm:h-40 object-cover rounded-2xl border border-white/10"
              />
            ))}
          </div>
        )}

        <div className="relative z-20">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4 text-base sm:text-lg font-semibold text-white hover:opacity-90 transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Analyzing your face, body, posture..." : "Analyze My Photos"}
          </button>
        </div>

        {loading && (
          <p className="mt-4 text-center text-gray-400 animate-pulse">
            Building your demo report...
          </p>
        )}

        {error && <p className="mt-4 text-center text-red-400">{error}</p>}

        {result && (
          <div className="mt-10 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
                <p className="text-sm text-gray-400">Face Score</p>
                <p className="mt-2 text-3xl font-bold">{faceScore}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
                <p className="text-sm text-gray-400">Body Score</p>
                <p className="mt-2 text-3xl font-bold">{bodyScore}</p>
              </div>
            </div>

            {!unlocked && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <h2 className="text-2xl font-bold">Preview Ready</h2>
                <p className="mt-3 text-gray-400">
                  Unlock your full report to see your complete analysis, top issues,
                  and personalized improvement roadmap.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => setUnlocked(true)}
                    className="rounded-2xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition"
                  >
                    Unlock Full Report (Demo)
                  </button>

                  <a
                    href="/pricing"
                    className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
                  >
                    View Pricing
                  </a>
                </div>
              </div>
            )}

            {unlocked && (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-2xl font-bold">Summary</h2>
                  <p className="mt-4 text-gray-300">
                    Overall: Above average structure with solid improvement potential if you focus on consistency.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-2xl font-bold">Top Issues</h2>
                    <ul className="mt-4 space-y-2 text-gray-300">
                      {issues.length > 0 ? (
                        issues.map((item, i) => <li key={i}>• {item}</li>)
                      ) : (
                        <li>• No issues found</li>
                      )}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-2xl font-bold">Suggestions</h2>
                    <ul className="mt-4 space-y-2 text-gray-300">
                      {suggestions.length > 0 ? (
                        suggestions.map((item, i) => <li key={i}>• {item}</li>)
                      ) : (
                        <li>• No suggestions found</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-2xl font-bold">Priority Focus</h2>
                    <ol className="mt-4 space-y-2 text-gray-300 list-decimal list-inside">
                      <li>Skin quality</li>
                      <li>Posture</li>
                      <li>Jawline definition</li>
                    </ol>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-2xl font-bold">Confidence Score</h2>
                    <p className="mt-4 text-gray-300">
                      High — clear lighting and strong photo angles improve confidence in this result.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-center">
                  <h3 className="text-xl font-bold">Scan Tips For Next Time</h3>
                  <ul className="mt-4 space-y-2 text-gray-400">
                    <li>• Use brighter natural lighting</li>
                    <li>• Keep a neutral face expression</li>
                    <li>• Stand front-facing with relaxed posture</li>
                    <li>• Avoid filters or edited photos</li>
                  </ul>

                  <p className="mt-5 text-gray-400">
                    Recommended next scan in 3–5 days
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold">Previous Scans</h3>

              <button
                type="button"
                onClick={clearHistory}
                className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              >
                Clear History
              </button>
            </div>

            <div className="space-y-4">
              {history.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 whitespace-pre-wrap"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}