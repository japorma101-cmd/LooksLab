import Link from "next/link";

export default function AcnePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn" className="text-sm text-purple-300 hover:text-purple-200">
          ← Back to Learn
        </Link>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold">Acne</h1>
        <p className="mt-4 text-lg text-gray-300">
          Acne can affect skin clarity, confidence, and overall facial appearance.
        </p>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What it can look like</h2>
            <p className="mt-3 text-gray-300">
              Visible breakouts, inflamed spots, clogged pores, redness, and uneven
              skin texture can all contribute to an acne-like appearance.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What affects appearance</h2>
            <p className="mt-3 text-gray-300">
              Oil production, stress, poor sleep, harsh skincare, and skin barrier
              damage can all make acne appear worse in photos.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">Non-medical advice</h2>
            <p className="mt-3 text-gray-300">
              (get a doctors advice before doing any of this) accutane + tazarotene for active acne. 
            </p>
          </section>

          <section className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="text-2xl font-bold">Important note</h2>
            <p className="mt-3 text-gray-300">
              LooksLab does not diagnose acne or provide medical treatment advice.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}