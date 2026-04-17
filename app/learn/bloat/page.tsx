import Link from "next/link";

export default function BloatPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn" className="text-sm text-purple-300 hover:text-purple-200">
          ← Back to Learn
        </Link>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold">Bloat</h1>
        <p className="mt-4 text-lg text-gray-300">
          A bloated or puffy look can make the face and body appear softer and less defined.
        </p>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What it can look like</h2>
            <p className="mt-3 text-gray-300">
              Facial puffiness, softer cheeks, less jawline sharpness, and a fuller-looking
              midsection can all contribute to a bloated appearance.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What affects appearance</h2>
            <p className="mt-3 text-gray-300">
              Hydration changes, sodium swings, poor sleep, meal timing, digestion,
              and stress can all affect puffiness.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">Basic non-medical advice</h2>
            <p className="mt-3 text-gray-300">
              Keep hydration, routine, food quality, and sleep more consistent.
              Compare photos at the same time of day.
            </p>
          </section>

          <section className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="text-2xl font-bold">Important note</h2>
            <p className="mt-3 text-gray-300">
              LooksLab does not diagnose medical causes of bloating or swelling.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}