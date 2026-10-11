import React from "react";
import { FaBasketShopping } from "react-icons/fa6";

const LoadingPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-gray-100 bg-white px-8 py-12 shadow-sm">
        {/* Animated Icon */}
        <div className="relative mb-7 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-100 border-t-green-800" />
          <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-green-50">
            <FaBasketShopping className="text-2xl text-green-800" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-bold text-gray-900">একটু অপেক্ষা করুন</h2>

        <p className="mt-2 text-center text-sm leading-6 text-gray-500">
          আপনার জন্য বাজার দর প্রস্তুত করা হচ্ছে...
        </p>

        {/* Loading Progress Animation */}
        <div className="mt-7 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-800 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-400" />
        </div>

        <p className="mt-6 text-xs font-medium tracking-wide text-gray-400">
          বাজার দর <span className="text-green-700">•</span> আপনার বাজার, আপনার
          হাতেই
        </p>
      </div>
    </main>
  );
};

export default LoadingPage;
