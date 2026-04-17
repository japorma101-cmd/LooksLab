export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          LooksLab
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-300">
          This page explains how LooksLab collects, uses, and stores information.
        </p>

        <div className="mt-10 space-y-8 text-gray-300 leading-7">
          <section>
            <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
            <p className="mt-3">
              We may collect account details, uploaded images, payment-related
              metadata, and app usage information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">2. How We Use Information</h2>
            <p className="mt-3">
              We use information to provide appearance analysis, improve the
              service, support payments, maintain security, and communicate with
              users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">3. Uploaded Photos</h2>
            <p className="mt-3">
              Uploaded photos may be processed by AI systems in order to generate
              analysis results. You should only upload photos you are comfortable
              submitting for processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">4. Payment Data</h2>
            <p className="mt-3">
              Payment processing may be handled by third-party providers. LooksLab
              does not directly store full card information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">5. Data Retention</h2>
            <p className="mt-3">
              We may retain account data, usage logs, and report history for
              operational, legal, and support purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">6. Security</h2>
            <p className="mt-3">
              We take reasonable steps to protect user information, but no system
              can guarantee complete security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">7. Your Choices</h2>
            <p className="mt-3">
              You may contact us to request account or data-related support,
              subject to applicable laws and platform limitations.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}