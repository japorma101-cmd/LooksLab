import Link from "next/link";

export default function BodyFatPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn" className="text-sm text-purple-300 hover:text-purple-200">
          ← Back to Learn
        </Link>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold">Body Fat</h1>
        <p className="mt-4 text-lg text-gray-300">
          Higher body-fat appearance can make the body and face look softer and less defined.
        </p>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What it can look like</h2>
            <p className="mt-3 text-gray-300">
              Softer jawline, reduced muscle visibility, thicker-looking midsection,
              and less visible athletic shape can all suggest higher body-fat appearance.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What affects appearance</h2>
            <p className="mt-3 text-gray-300">
              Bloat, lighting, pose, clothing, and muscle mass all affect how lean
              or soft someone looks.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">Basic non-medical advice</h2>
            <p className="mt-3 text-gray-300">
              Focus on food quality, calorie control, protein intake, movement,
              and better sleep consistency.
            </p>
          </section>

          <section className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="text-2xl font-bold">Important note</h2>
            <p className="mt-3 text-gray-300">
              LooksLab does not diagnose obesity or provide medical weight-loss treatment advice.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}