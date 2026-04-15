export default function OnboardingPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
            Before You Scan
          </p>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
            Get the best scan possible
          </h1>

          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Better photos lead to better analysis. Follow these simple tips before uploading.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Use clear lighting</h2>
            <p className="mt-3 text-gray-400">
              Take photos in bright, natural lighting so features are easy to see.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Avoid filters</h2>
            <p className="mt-3 text-gray-400">
              Do not use beauty filters or heavy edits. Keep it natural.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Use front-facing photos</h2>
            <p className="mt-3 text-gray-400">
              A neutral face photo and a clear body shot work best.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Stand naturally</h2>
            <p className="mt-3 text-gray-400">
              Good posture and a simple pose help the scan look more consistent.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/upload"
            className="inline-block rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white hover:opacity-90 transition"
          >
            Continue to Upload
          </a>
        </div>
      </div>
    </main>
  );
}