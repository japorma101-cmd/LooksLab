export default function PricingPage() {
  return (
    <main className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="inline-block rounded-full bg-red-500/20 px-4 py-1 text-xs uppercase tracking-[0.25em] text-red-300">
            Limited Time Offer
          </p>

          <h1 className="mt-5 text-5xl font-extrabold tracking-tight">
            Unlock LooksLab
          </h1>

          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your glow-up journey. Get deeper analysis,
            progress tools, and premium scan insights.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
              One-Time Report
            </p>
            <h2 className="mt-4 text-4xl font-bold">$15</h2>
            <p className="mt-2 text-gray-400">Perfect for a single premium scan</p>

            <ul className="mt-8 space-y-3 text-gray-300">
              <li>• Full appearance report</li>
              <li>• Face and body scores</li>
              <li>• Top visible issues</li>
              <li>• Improvement suggestions</li>
              <li>• Priority focus order</li>
            </ul>

            <button className="mt-8 w-full rounded-2xl bg-white py-4 font-semibold text-black hover:bg-gray-200 transition">
              Unlock Report
            </button>
          </div>

          <div className="rounded-3xl border-2 border-purple-500 bg-white/5 p-8 shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-500 px-4 py-1 text-xs font-semibold text-white">
              Most Popular
            </div>

            <p className="text-sm uppercase tracking-[0.25em] text-purple-300">
              Monthly
            </p>
            <h2 className="mt-4 text-4xl font-bold">$20</h2>
            <p className="mt-2 text-gray-400">Best for ongoing progress tracking</p>

            <ul className="mt-8 space-y-3 text-gray-300">
              <li>• Everything in one-time report</li>
              <li>• Unlimited demo scans</li>
              <li>• Progress tracking dashboard</li>
              <li>• Scan history</li>
              <li>• Priority improvement roadmap</li>
              <li>• Confidence score on reports</li>
            </ul>

            <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 py-4 font-semibold text-white hover:opacity-90 transition">
              Start Monthly Plan
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
              Yearly
            </p>
            <h2 className="mt-4 text-4xl font-bold">$50</h2>
            <p className="mt-2 text-gray-400">Best value for long-term glow-up goals</p>

            <ul className="mt-8 space-y-3 text-gray-300">
              <li>• Everything in monthly</li>
              <li>• Best value pricing</li>
              <li>• Long-term tracking</li>
              <li>• Repeat scan monitoring</li>
              <li>• Better goal consistency</li>
              <li>• Premium account badge</li>
            </ul>

            <button className="mt-8 w-full rounded-2xl border border-white/20 py-4 font-semibold text-white hover:bg-white/10 transition">
              Choose Yearly
            </button>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-3xl font-bold">Why upgrade?</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Most users upgrade after their first scan because the premium report makes
            it easier to understand what to improve first and how to stay consistent.
          </p>
        </div>
      </div>
    </main>
  );
}