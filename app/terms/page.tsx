export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          LooksLab
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold">
          Terms & Conditions
        </h1>

        <p className="mt-4 text-gray-300">
          By using LooksLab, you agree to these terms. If you do not agree, do
          not use the service.
        </p>

        <div className="mt-10 space-y-8 text-gray-300 leading-7">
          <section>
            <h2 className="text-2xl font-bold text-white">1. Service</h2>
            <p className="mt-3">
              LooksLab provides AI-generated appearance analysis and educational
              information based on user-uploaded photos. Results are generated
              automatically and may be inaccurate, incomplete, or inconsistent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">2. Not Medical Advice</h2>
            <p className="mt-3">
              LooksLab does not provide medical advice, diagnosis, treatment, or
              professional healthcare services. Do not start, stop, or change any
              medication, supplement, or health treatment based on app output.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">3. Eligibility</h2>
            <p className="mt-3">
              You must be at least 18 years old to use paid features or upload
              photos for analysis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">4. User Content</h2>
            <p className="mt-3">
              By uploading photos, you confirm you have the right to upload and
              process them. You are responsible for the content you submit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">5. Payments</h2>
            <p className="mt-3">
              Paid features may include one-time purchases and subscriptions.
              Subscription plans renew automatically unless canceled. One-time
              reports may be limited to a single use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">6. Refunds</h2>
            <p className="mt-3">
              Refunds are handled according to the payment provider and any
              applicable laws. Once a one-time report has been used, it may not
              be refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">7. No Guarantees</h2>
            <p className="mt-3">
              We do not guarantee any specific result, improvement, or outcome
              from using the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">8. Limitation of Liability</h2>
            <p className="mt-3">
              LooksLab is provided “as is.” To the fullest extent allowed by law,
              LooksLab and its operators are not liable for losses, damages, or
              decisions made based on app content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">9. Updates</h2>
            <p className="mt-3">
              We may update these terms at any time. Continued use of the service
              means you accept the updated terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}