import Link from "next/link";

export default function JawlinePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn" className="text-sm text-purple-300 hover:text-purple-200">
          ← Back to Learn
        </Link>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold">Jawline</h1>
        <p className="mt-4 text-lg text-gray-300">
          Jawline sharpness plays a big role in facial definition and structure.
        </p>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What it can look like</h2>
            <p className="mt-3 text-gray-300">
              A softer lower face, less definition under the chin, and reduced
              structure can make the jawline look weaker in photos.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">What affects appearance</h2>
            <p className="mt-3 text-gray-300">
              Neck posture, body-fat appearance, puffiness, camera angle, and head
              position all affect how sharp the jawline appears.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">Basic non-medical advice</h2>
            <p className="mt-3 text-gray-300">
              Use consistent angles, improve posture, and compare photos over time
              instead of judging one single image.
            </p>
          </section>

          <section className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="text-2xl font-bold">Important note</h2>
            <p className="mt-3 text-gray-300">
              LooksLab does not diagnose bone structure issues or provide medical advice.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}