"use client";

import { useState } from "react";

type TagItem = {
  name: string;
  confidence: string;
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
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
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
    if (files.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setError("");
    setAnalysis(null);
    setLoading(true);

    try {
      const images = await Promise.all(files.map((file) => fileToDataUrl(file)));

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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);

    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

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
              Upload clear face and body photos. LooksLab will scan visible features,
              identify key appearance patterns, and generate your automatic improvement plan.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <h2 className="text-xl font-bold">Before you scan</h2>

              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                <li>• Use bright front-facing lighting</li>
                <li>• Upload clear face and body photos</li>
                <li>• Avoid filters and heavy editing</li>
                <li>• Stand straight for the most accurate posture reading</li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-gray-400">Best results come from:</p>
                <p className="mt-2 text-sm text-white">
                  1 face photo + 1 upper body or full body photo
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-center">
              <h2 className="text-xl font-bold">Upload images</h2>

              <p className="mt-3 text-sm text-gray-400">
                JPG, JPEG, PNG, or WebP only
              </p>

              <input
                id="photo-upload"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange}
                className="hidden"
              />

              <label
                htmlFor="photo-upload"
                className="mt-6 inline-block cursor-pointer rounded-2xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition"
              >
                Choose Photos
              </label>

              <p className="mt-4 text-sm text-gray-400">
                {files.length > 0
                  ? `${files.length} photo${files.length > 1 ? "s" : ""} selected`
                  : "No photos selected yet"}
              </p>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4 text-base sm:text-lg font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze My Photos"}
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-6 text-center text-red-400 font-medium">{error}</p>
          )}

          {previewUrls.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Selected Photos</h2>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full rounded-2xl object-cover border border-white/10"
                  />
                ))}
              </div>
            </div>
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
                        <span className="capitalize">
                          {tag.name.replaceAll("_", " ")}
                        </span>
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