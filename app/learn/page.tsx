import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            LooksLab
          </Link>

          <nav className="hidden gap-6 text-sm text-gray-300 md:flex">
            <Link href="/learn" className="hover:text-white transition">
              Learn
            </Link>
            <Link href="/pricing" className="hover:text-white transition">
              Pricing
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition">
              Disclaimer
            </Link>
          </nav>
        </header>

        <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-12 text-center sm:pt-20">
          <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-400">
            AI Appearance Analysis
          </p>

          <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Upload your photos.
            <br />
            Get your LooksLab scan.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
            LooksLab analyzes visible appearance patterns like acne, hair
            thinning, posture, muscle definition, body-fat appearance, bloat,
            facial contrast, and more.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/upload"
              className="rounded-2xl bg-white px-8 py-4 font-semibold text-black hover:bg-gray-200 transition"
            >
              Start Free Scan
            </Link>

            <Link
              href="/learn"
              className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white hover:bg-white/10 transition"
            >
              Explore Learn Hub
            </Link>
          </div>

          <div className="mt-14 grid w-full max-w-5xl gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Scan
              </p>
              <h2 className="mt-3 text-2xl font-bold">Upload face + body photos</h2>
              <p className="mt-3 text-gray-300">
                Submit clear photos and get an AI-generated appearance report.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Analyze
              </p>
              <h2 className="mt-3 text-2xl font-bold">Get visible trait detection</h2>
              <p className="mt-3 text-gray-300">
                See tags for appearance patterns such as acne, posture, bloat,
                and more.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Improve
              </p>
              <h2 className="mt-3 text-2xl font-bold">Learn what to focus on</h2>
              <p className="mt-3 text-gray-300">
                Get educational guidance, a summary, and priority focus areas.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  Learn Hub
                </p>
                <h2 className="mt-3 text-4xl font-extrabold">
                  Explore the biggest appearance topics
                </h2>
                <p className="mt-4 max-w-xl text-gray-300 leading-7">
                  Read educational pages on acne, balding, muscle, bloat,
                  wrinkles, posture, body-fat appearance, jawline, and more.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Acne",
                    "Balding",
                    "Muscle",
                    "Bloat",
                    "Wrinkles",
                    "Posture",
                    "Body Fat",
                    "Jawline",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href="/learn"
                  className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 font-semibold text-white hover:opacity-90 transition"
                >
                  Open Learn Hub
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/learn/acne"
                  className="rounded-3xl border border-white/10 bg-black/30 p-6 hover:bg-white/5 transition"
                >
                  <h3 className="text-xl font-bold">Acne</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Learn about visible breakouts, skin texture, and consistency.
                  </p>
                </Link>

                <Link
                  href="/learn/balding"
                  className="rounded-3xl border border-white/10 bg-black/30 p-6 hover:bg-white/5 transition"
                >
                  <h3 className="text-xl font-bold">Balding</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Understand hair thinning appearance and tracking.
                  </p>
                </Link>

                <Link
                  href="/learn/muscle"
                  className="rounded-3xl border border-white/10 bg-black/30 p-6 hover:bg-white/5 transition"
                >
                  <h3 className="text-xl font-bold">Muscle</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Read about low muscle definition and visual physique factors.
                  </p>
                </Link>

                <Link
                  href="/learn/bloat"
                  className="rounded-3xl border border-white/10 bg-black/30 p-6 hover:bg-white/5 transition"
                >
                  <h3 className="text-xl font-bold">Bloat</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    See what can contribute to a puffy or bloated look.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-6xl px-6 pb-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-gray-400 sm:flex-row">
            <p>© {new Date().getFullYear()} LooksLab. All rights reserved.</p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/learn" className="hover:text-white transition">
                Learn
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy
              </Link>
              <Link href="/disclaimer" className="hover:text-white transition">
                Disclaimer
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}