"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SignInIWithOthers from "../components/SignInIWithOthers";

const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setError("");

    const { data, error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
      router.push("/");
    }

    if (signUpError) {
      setError(signUpError.message || "সাইন আপ করা সম্ভব হয়নি।");
      console.log(signUpError);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-7 mt-7 text-center">
          <h1 className="mt-5 text-3xl font-extrabold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বিনামূল্যে সাইন আপ করে পণ্যের বিস্তারিত বাজারদর দেখুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              আপনার পূর্ণ নাম
            </label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="আপনার পূর্ণ নাম লিখুন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full rounded-xl"
              required
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              ইমেইল ঠিকানা
            </label>

            <input
              id="signup-email"
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
              htmlFor="signup-password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full rounded-xl"
              minLength={8}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="আবার পাসওয়ার্ড লিখুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full rounded-xl"
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
            className="btn w-full rounded-xl border-0 bg-green-800 text-white hover:bg-green-900"
          >
            সাইন আপ করুন
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-bold text-green-800 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

        <div className="mt-6">
          <div className="divider text-sm text-gray-400">অথবা</div>

          <SignInIWithOthers />
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
