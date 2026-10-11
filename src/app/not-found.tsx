import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaHouse, FaStore } from "react-icons/fa6";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-green-100">
          <div className="absolute inset-3 rounded-full border-2 border-dashed border-green-300" />
          <FaStore className="text-5xl text-green-800" />
          <span className="absolute -right-2 -top-2 rounded-xl bg-green-800 px-3 py-1 text-sm font-bold text-white shadow-md">
            404
          </span>
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-800">
          Page Not Found
        </p>

        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে, ঠিকানা
          পরিবর্তন হয়েছে, অথবা পৃষ্ঠাটি আর উপলব্ধ নেই।
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-lg"
          >
            <FaHouse />
            হোম পেজে ফিরে যান
          </Link>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-5">
          <p className="text-sm font-medium text-gray-400">
            বাজার দর <span className="mx-1 text-green-700">•</span> আপনার বাজার,
            আপনার হাতেই
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
