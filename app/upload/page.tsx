"use client";

import { useState } from "react";

type TagItem = {
  name: string;
  confidence: string;
  display: string;
};

type AnalysisResult = {
  overall_rating: number | null;
  summary: string;
  priority_focus: string[];
  tags: TagItem[];
  scan_quality: string;
  scan_quality_tips: string[];
  mapped_advice: string[];
};

export default function UploadPage() {
  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [bodyFile, setBodyFile] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string>("");
  const [bodyPreview, setBodyPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  async function fileToDataUrl(file: File): Promise<string> {
    const supportedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (supportedTypes.includes(file.type)) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not create canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0);

          const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.92);
          URL.revokeObjectURL(objectUrl);
          resolve(jpegDataUrl);
        } catch (err) {
          URL.revokeObjectURL(objectUrl);
          reject(err);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Failed to load image for conversion"));
      };

      img.src = objectUrl;
    });
  }

  async function handleAnalyze() {
    if (!faceFile && !bodyFile) {
      setError("Please upload at least one image.");
      return;
    }

    setError("");
    setAnalysis(null);
    setLoading(true);

    try {
      const selectedFiles = [faceFile, bodyFile].filter(Boolean) as File[];
      const images = await Promise.all(selectedFiles.map((file) => fileToDataUrl(file)));

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze");
    } finally {
      setLoading(false);
    }
  }

  function handleFaceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setFaceFile(file);
    setFacePreview(file ? URL.createObjectURL(file) : "");
    setAnalysis(null);
    setError("");
  }

  function handleBodyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setBodyFile(file);
    setBodyPreview(file ? URL.createObjectURL(file) : "");
    setAnalysis(null);
    setError("");
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              LooksLab AI
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Upload Your Photos
            </h1>

            <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-gray-300">
              Upload a face photo and a body photo for a stronger, more complete appearance analysis.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <h2 className="text-xl font-bold">Face Photo</h2>
              <p className="mt-2 text-sm text-gray-400">
                Use bright front-facing lighting and no filters.
              </p>

              <input
                id="face-upload"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFaceChange}
                className="hidden"
              />

              <label
                htmlFor="face-upload"
                className="mt-5 inline-block cursor-pointer rounded-2xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition"
              >
                Upload Face Photo
              </label>

              {facePreview && (
                <img
                  src={facePreview}
                  alt="Face preview"
                  className="mt-5 h-48 w-full rounded-2xl object-cover border border-white/10"
                />
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <h2 className="text-xl font-bold">Body Photo</h2>
              <p className="mt-2 text-sm text-gray-400">
                Upper body or full body works best.
              </p>

              <input
                id="body-upload"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleBodyChange}
                className="hidden"
              />

              <label
                htmlFor="body-upload"
                className="mt-5 inline-block cursor-pointer rounded-2xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition"
              >
                Upload Body Photo
              </label>

              {bodyPreview && (
                <img
                  src={bodyPreview}
                  alt="Body preview"
                  className="mt-5 h-48 w-full rounded-2xl object-cover border border-white/10"
                />
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4 text-base sm:text-lg font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze My Photos"}
          </button>

          {error && (
            <p className="mt-6 text-center text-red-400 font-medium">{error}</p>
          )}

          {analysis && (
            <div className="mt-10 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-2xl font-bold">Overall Rating</h2>
                  <p className="mt-3 text-4xl font-extrabold">
                    {analysis.overall_rating ?? "--"} / 10
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-2xl font-bold">Scan Quality</h2>
                  <p className="mt-3 text-lg capitalize text-gray-300">
                    {analysis.scan_quality || "medium"}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-bold">Summary</h2>
                <p className="mt-4 text-gray-300 leading-7">{analysis.summary}</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-2xl font-bold">Priority Focus</h2>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    {analysis.priority_focus?.length > 0 ? (
                      analysis.priority_focus.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))
                    ) : (
                      <li>• No priority items returned</li>
                    )}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-2xl font-bold">Scan Quality Tips</h2>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    {analysis.scan_quality_tips?.length > 0 ? (
                      analysis.scan_quality_tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))
                    ) : (
                      <li>• No scan tips returned</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-bold">Detected Tags</h2>

                {analysis.tags?.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {analysis.tags.map((tag, i) => (
                      <div
                        key={i}
                        className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white"
                      >
                        <span>tag.display</span>
                        <span className="ml-2 text-gray-400">
                          ({tag.confidence})
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-gray-300">No tags detected.</p>
                )}
              </div>

              <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6">
                <h2 className="text-2xl font-bold">Auto Improvement Plan</h2>
                <p className="mt-2 text-sm text-gray-400">
                  These suggestions are automatically generated from the detected visual tags.
                </p>

                <ul className="mt-5 space-y-3 text-gray-200">
                  {analysis.mapped_advice?.length > 0 ? (
                    analysis.mapped_advice.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))
                  ) : (
                    <li>• No preset advice matched</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}