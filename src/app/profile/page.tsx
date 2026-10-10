"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submittedName = (name || user?.name || "").trim();

    setError("");
    setSuccess("");

    if (!submittedName) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await authClient.updateUser({
        name: submittedName,
      });

      if (updateError) {
        setError(updateError.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      setSuccess("আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে।");
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/sign-in");
          router.refresh();
        },
      },
    });
  };

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-green-50">
        <span className="loading loading-spinner loading-lg text-green-800" />
      </main>
    );
  }

  const initial =
    user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-green-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-gray-600">
            আপনার BazarDor অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl">
          <div className="bg-green-800 px-6 py-8 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-green-100 text-4xl font-bold text-green-900">
              {initial}
            </div>

            <h2 className="mt-4 text-xl font-bold text-white">
              {user.name || "ব্যবহারকারী"}
            </h2>

            <p className="mt-1 text-sm text-green-100">{user.email}</p>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              অ্যাকাউন্টের তথ্য
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  আপনার নাম
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  className="input input-bordered w-full rounded-xl"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  ইমেইল ঠিকানা
                </label>

                <input
                  id="email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="input input-bordered w-full rounded-xl bg-gray-100 text-gray-500"
                />

                <p className="mt-1 text-xs text-gray-500">
                  ইমেইল পরিবর্তন এই ফর্ম থেকে করা যাবে না।
                </p>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p role="status" className="text-sm text-green-700">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn w-full rounded-xl border-0 bg-green-800 text-white hover:bg-green-900"
              >
                {loading ? "আপডেট হচ্ছে..." : "প্রোফাইল আপডেট করুন"}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
              <button
                onClick={() => router.push("/")}
                className="btn flex-1 rounded-xl border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                হোম পেজে ফিরে যান
              </button>

              <button
                onClick={handleSignOut}
                className="btn flex-1 rounded-xl border-red-200 bg-white text-red-600 hover:bg-red-50"
              >
                সাইন আউট
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
