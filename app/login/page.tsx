"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    await supabase.auth.signInWithPassword({ email, password });
    router.push("/account");
  }

  async function signup() {
    await supabase.auth.signUp({ email, password });
    router.push("/account");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 bg-white/10 rounded-2xl">
        <h1 className="text-3xl font-bold">Login</h1>

        <input
          className="mt-4 w-full p-2 text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mt-2 w-full p-2 text-black"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login} className="mt-4 bg-white text-black px-4 py-2">
          Login
        </button>

        <button onClick={signup} className="mt-2">
          Create account
        </button>
      </div>
    </main>
  );
}