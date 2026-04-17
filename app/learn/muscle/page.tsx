import Link from "next/link";

export default function MusclePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn" className="text-sm text-purple-300 hover:text-purple-200">
          ← Back to Learn
        </Link>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold">Muscle</h1>
        <p className="mt-4 text-lg text-gray-300">
          Muscle definition changes how athletic, strong, and aesthetic someone looks.
        </p>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What it can look like</h2>
            <p className="mt-3 text-gray-300">
              Lower muscle definition may show as softer arms, flatter shoulders,
              less chest shape, and a weaker athletic outline.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What affects appearance</h2>
            <p className="mt-3 text-gray-300">
              Lighting, posture, pump, body fat, hydration, and clothing all affect
              how muscular someone looks in photos.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">Basic non-medical advice</h2>
            <p className="mt-3 text-gray-300">
              Focus on resistance training, progressive overload, protein intake,
              recovery, and consistent progress tracking.
            </p>
          </section>

          <section className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="text-2xl font-bold">Important note</h2>
            <p className="mt-3 text-gray-300">
              LooksLab provides appearance education only, not medical advice.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}