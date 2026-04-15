export default function LoginPage() {
  return (
    <main className="px-6 py-16">
      <div className="max-w-md mx-auto rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-400 text-center">
          Account Access
        </p>

        <h1 className="mt-4 text-4xl font-extrabold text-center">Login</h1>

        <p className="mt-3 text-center text-gray-400">
          Sign in to access your scans and progress.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          />

          <button className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 font-semibold text-white hover:opacity-90 transition">
            Sign In
          </button>
        </div>
      </div>
    </main>
  );
}