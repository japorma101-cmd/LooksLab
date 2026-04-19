import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold">Account</h1>
      <p className="mt-4">{user.email}</p>
    </main>
  );
}