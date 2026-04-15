export default function FAQPage() {
  const faqs = [
    {
      question: "How does LooksLab work?",
      answer:
        "You upload clear face and body photos, then the app generates an appearance-focused report and improvement roadmap.",
    },
    {
      question: "What photos should I upload?",
      answer:
        "Use clear, well-lit photos with a neutral pose and minimal blur for the best analysis quality.",
    },
    {
      question: "How often should I scan again?",
      answer:
        "Most users rescan every few days or weekly to track progress without overchecking.",
    },
    {
      question: "Does LooksLab provide medical advice?",
      answer:
        "No. LooksLab is for appearance and wellness guidance only and does not replace licensed medical advice.",
    },
  ];

  return (
    <main className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
          FAQ
        </p>

        <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
          Frequently Asked Questions
        </h1>

        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-xl font-bold">{faq.question}</h2>
              <p className="mt-3 text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}