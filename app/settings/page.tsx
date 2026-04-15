export default function SettingsPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
          Settings
        </p>

        <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
          Account Settings
        </h1>

        <div className="mt-10 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-xl font-bold">Theme</h2>
            <p className="mt-2 text-gray-400">Dark mode enabled</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-xl font-bold">Notifications</h2>
            <p className="mt-2 text-gray-400">
              Scan reminders and product updates
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-xl font-bold">Current Plan</h2>
            <p className="mt-2 text-gray-400">Demo / Free Access</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-xl font-bold">Privacy</h2>
            <p className="mt-2 text-gray-400">
              Your uploaded scans are for personal analysis only.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}