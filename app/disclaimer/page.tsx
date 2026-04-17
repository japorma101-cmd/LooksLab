export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          LooksLab
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold">
          Disclaimer
        </h1>

        <div className="mt-10 space-y-8 text-gray-300 leading-7">
          <section className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
            <h2 className="text-2xl font-bold text-white">Not Medical Advice</h2>
            <p className="mt-3">
              LooksLab is for educational and informational purposes only. It is
              not medical advice, diagnosis, or treatment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">AI Limitations</h2>
            <p className="mt-3">
              AI-generated outputs may be wrong, incomplete, inconsistent, or
              oversimplified. Do not rely on app results for important health or
              treatment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">No Guaranteed Results</h2>
            <p className="mt-3">
              LooksLab does not guarantee any physical, cosmetic, or lifestyle
              outcome from using the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">Professional Guidance</h2>
            <p className="mt-3">
              If you have concerns about your health, skin, hair, body
              composition, or any medical condition, seek advice from a qualified
              professional.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}