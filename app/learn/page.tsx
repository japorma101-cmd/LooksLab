import Link from "next/link";
import { topics } from "./data";

export default function LearnPage() {
  const topicEntries = Object.entries(topics);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          LooksLab
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold">
          Learn
        </h1>

        <p className="mt-4 max-w-2xl text-gray-300">
          Explore educational appearance topics like acne, balding, muscle,
          bloat, wrinkles, posture, and more.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topicEntries.map(([slug, topic]) => (
            <Link
              key={slug}
              href={`/learn/${slug}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <h2 className="text-2xl font-bold">{topic.title}</h2>
              <p className="mt-3 text-sm text-gray-300">{topic.intro}</p>
              <p className="mt-6 text-sm font-semibold text-purple-300">
                Open topic →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}