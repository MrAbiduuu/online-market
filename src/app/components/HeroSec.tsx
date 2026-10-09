import Image from "next/image";
import React from "react";

const HeroSec = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div className="container mx-auto px-4 py-8 md:py-14">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-green-50 via-white to-lime-100 px-6 py-10 shadow-sm md:px-12 md:py-14">
        {/* Decorative background */}
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-green-200/30 blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-lime-200/40 blur-3xl"></div>

        <div className="relative flex flex-col items-center gap-10 md:flex-row md:justify-between">
          {/* Text section */}
          <div className="max-w-2xl text-center md:text-left">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-600"></span>
              {date}
            </p>

            <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              আজকের বাজারের দাম
              <span className="mt-2 block text-green-700">এক নজরে</span>
            </h1>

            <p className="mx-auto max-w-xl text-base leading-8 text-gray-600 md:mx-0 md:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#market-prices"
                className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-1 hover:bg-green-800"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          {/* Image section */}
          <div className="relative w-full max-w-md shrink-0 md:w-[42%]">
            <div className="absolute inset-4 rounded-full bg-green-300/30 blur-2xl"></div>

            <Image
              src="/bazar-hero.png"
              alt="আজকের বাজারের পণ্য"
              width={600}
              height={450}
              priority
              className="relative h-auto w-full object-contain drop-shadow-xl transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSec;
