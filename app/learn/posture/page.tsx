import Link from "next/link";

export default function PosturePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn" className="text-sm text-purple-300 hover:text-purple-200">
          ← Back to Learn
        </Link>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold">Posture</h1>
        <p className="mt-4 text-lg text-gray-300">
          Posture affects confidence, body shape, and overall visual presence.
        </p>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What it can look like</h2>
            <p className="mt-3 text-gray-300">
              Rounded shoulders, head-forward posture, a slouched upper back, and a
              collapsed stance can all reduce visual appeal.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What affects appearance</h2>
            <p className="mt-3 text-gray-300">
              Fatigue, weak upper back, weak core, sitting habits, and poor standing
              form can all affect posture.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">Basic non-medical advice</h2>
            <p className="mt-3 text-gray-300">
              Practice standing tall, improve upper-back and core strength, and
              retake photos with consistent posture.
            </p>
          </section>

          <section className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="text-2xl font-bold">Important note</h2>
            <p className="mt-3 text-gray-300">
              LooksLab does not diagnose structural or medical posture conditions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}