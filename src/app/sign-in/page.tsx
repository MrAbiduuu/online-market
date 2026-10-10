"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signInError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (signInError) {
        setError(signInError.message || "সাইন ইন করা সম্ভব হয়নি।");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-7 mt-7 text-center">
          <h1 className="mt-5 text-3xl font-extrabold text-gray-900">
            স্বাগতম!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার BazarDor অ্যাকাউন্টে সাইন ইন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              autoComplete="email"
              placeholder="আপনার ইমেইল লিখুন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full rounded-xl"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full rounded-xl"
              minLength={8}
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full rounded-xl border-0 bg-green-800 text-white hover:bg-green-900 disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          আপনার কি অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-bold text-green-800 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>

        <div className="mt-6 border-t border-gray-100 pt-5 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-green-800 hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
