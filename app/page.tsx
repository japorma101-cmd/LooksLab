export default function Home() {
  return (
    <main className="px-6 pt-10 pb-24">
      <section className="flex items-center justify-center pt-10 pb-20">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
              AI Appearance Analysis
            </p>

            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Scan your look.
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Build your glow-up plan.
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              LooksLab analyzes your face and body photos, highlights your most important improvement areas,
              and helps you track your glow-up over time.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/onboarding"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:opacity-90 transition text-center"
              >
                Start Free Scan
              </a>

              <a
                href="/pricing"
                className="px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition text-center"
              >
                View Pricing
              </a>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Private • AI-powered • Built for progress tracking
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm text-gray-400">Demo Scan Preview</p>
              <h2 className="mt-2 text-2xl font-bold">LooksLab Report</h2>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10 text-center">
                  <p className="text-sm text-gray-400">Face Score</p>
                  <p className="mt-2 text-3xl font-bold">7.8</p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 border border-white/10 text-center">
                  <p className="text-sm text-gray-400">Body Score</p>
                  <p className="mt-2 text-3xl font-bold">7.2</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/5 p-4 border border-white/10">
                <p className="font-semibold">Priority Focus</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-300">
                  <li>• Skin quality</li>
                  <li>• Posture</li>
                  <li>• Jawline definition</li>
                </ul>
              </div>

              <div className="mt-4 rounded-2xl bg-white/5 p-4 border border-white/10">
                <p className="font-semibold">Confidence Score</p>
                <p className="mt-2 text-sm text-gray-300">
                  High — clear lighting and good front-facing angles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto pb-20">
        <h2 className="text-4xl font-bold text-center">Why LooksLab works</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold">Objective analysis</h3>
            <p className="mt-3 text-gray-400">
              LooksLab helps you see the most visible improvement areas clearly and consistently.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold">Actionable next steps</h3>
            <p className="mt-3 text-gray-400">
              Instead of random advice, you get a focused roadmap of what to improve first.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold">Progress tracking</h3>
            <p className="mt-3 text-gray-400">
              Compare scans over time and stay motivated as your scores improve.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto pb-20">
        <h2 className="text-4xl font-bold text-center">How it works</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">Step 1</p>
            <h3 className="mt-2 text-xl font-bold">Upload photos</h3>
            <p className="mt-3 text-gray-400">
              Submit clear face and body photos for analysis.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">Step 2</p>
            <h3 className="mt-2 text-xl font-bold">Get your report</h3>
            <p className="mt-3 text-gray-400">
              Receive scores, visible issues, and a focused improvement plan.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">Step 3</p>
            <h3 className="mt-2 text-xl font-bold">Track your glow-up</h3>
            <p className="mt-3 text-gray-400">
              Compare scans over time and watch your progress build.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto pb-20">
        <h2 className="text-4xl font-bold text-center">What users love</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-gray-300">
              “It made it obvious what I actually needed to focus on first.”
            </p>
            <p className="mt-4 text-sm text-gray-500">— Demo User</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-gray-300">
              “The progress side of it is what makes it addictive.”
            </p>
            <p className="mt-4 text-sm text-gray-500">— Demo User</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-gray-300">
              “It already feels like a premium app even in demo mode.”
            </p>
            <p className="mt-4 text-sm text-gray-500">— Demo User</p>
          </div>
        </div>
      </section>
    </main>
  );
}