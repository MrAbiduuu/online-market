"use client";

import React, { useMemo, useState } from "react";
import { ProductChange } from "../category/[slug]/page";
import Link from "next/link";

type SortOption =
  | "default"
  | "price-low"
  | "price-high"
  | "name"
  | "increase"
  | "decrease";

const ProductCategoryClient = ({
  products,
  slug,
}: {
  products: ProductChange[];
  slug: string;
}) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState("all");

  const categoryIcon = products[0]?.categoryIcon ?? "🛒";
  const categoryName = products[0]?.categoryNameBn ?? slug;

  const sortedProducts = useMemo(() => {
    let result = [...products];

    if (priceRange === "under100") {
      result = result.filter((p) => p.today < 100);
    } else if (priceRange === "100to200") {
      result = result.filter((p) => p.today >= 100 && p.today <= 200);
    } else if (priceRange === "over200") {
      result = result.filter((p) => p.today > 200);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.today - b.today);
        break;
      case "price-high":
        result.sort((a, b) => b.today - a.today);
        break;
      case "name":
        result.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
        break;
      case "increase":
        result.sort((a, b) => b.today - b.yesterday - (a.today - a.yesterday));
        break;
      case "decrease":
        result.sort((a, b) => a.today - a.yesterday - (b.today - b.yesterday));
        break;
    }

    return result;
  }, [products, sortBy, priceRange]);

  const resetFilters = () => {
    setSortBy("default");
    setPriceRange("all");
  };

  return (
    <main className="min-h-screen bg-base-200/50">
      <div className="container mx-auto px-4 py-8 lg:px-6">
        {/* Page heading */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-neutral p-6 text-neutral-content shadow-lg sm:p-9">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="mb-3 text-sm font-medium tracking-widest text-lime-400">
                BAZARDOR / PRODUCT CATEGORY
              </p>

              <h1 className="flex items-center gap-3 text-3xl font-extrabold sm:text-4xl">
                <span>{categoryIcon}</span>
                {categoryName}
              </h1>

              <p className="mt-3 text-sm text-neutral-content/70 sm:text-base">
                নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর দেখুন এক জায়গায়।
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 sm:min-w-36">
              <p className="text-sm text-neutral-content/70">মোট পণ্য</p>
              <p className="mt-1 text-3xl font-bold text-lime-400">
                {products.length}
              </p>
              <p className="text-xs text-neutral-content/60">টি পণ্য</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sorting sidebar */}
          <aside className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm lg:sticky lg:top-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">ফিল্টার ও সর্ট</h2>

              <button
                onClick={resetFilters}
                className="text-sm font-medium text-primary hover:underline"
              >
                রিসেট
              </button>
            </div>

            <div className="mb-6">
              <label
                htmlFor="sort"
                className="mb-3 block text-sm font-semibold"
              >
                সাজান
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="select select-bordered w-full rounded-xl"
              >
                <option value="default">ডিফল্ট</option>
                <option value="price-low">দাম: কম থেকে বেশি</option>
                <option value="price-high">দাম: বেশি থেকে কম</option>
                <option value="name">নাম অনুযায়ী</option>
                <option value="increase">দাম বৃদ্ধি অনুযায়ী</option>
                <option value="decrease">দাম হ্রাস অনুযায়ী</option>
              </select>
            </div>

            <div className="divider my-4" />

            <div>
              <h3 className="mb-4 text-sm font-semibold">আজকের দামের সীমা</h3>

              <div className="space-y-3">
                {[
                  { value: "all", label: "সব দাম" },
                  { value: "under100", label: "৳১০০-এর নিচে" },
                  { value: "100to200", label: "৳১০০ – ৳২০০" },
                  { value: "over200", label: "৳২০০-এর বেশি" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 text-sm"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      value={option.value}
                      checked={priceRange === option.value}
                      onChange={() => setPriceRange(option.value)}
                      className="radio radio-primary radio-sm"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-base-200 p-4">
              <p className="text-sm font-semibold">
                <span className="mr-2">💡</span>
                বাজারদর টিপস
              </p>
              <p className="mt-2 text-xs leading-5 opacity-70">
                কেনাকাটার আগে আজকের দাম ও গতকালের দাম তুলনা করে নিন।
              </p>
            </div>
          </aside>

          {/* Products */}
          <section className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">সব পণ্য</h2>
                <p className="mt-1 text-sm opacity-60">
                  {sortedProducts.length}টি পণ্য পাওয়া গেছে
                </p>
              </div>

              <div className="rounded-full border border-base-300 bg-base-100 px-4 py-2 text-xs font-medium">
                📊 দৈনিক মূল্য তালিকা
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="rounded-2xl border border-base-300 bg-base-100 px-5 py-16 text-center">
                <div className="mb-3 text-4xl">🔎</div>
                <h3 className="text-lg font-bold">কোনো পণ্য পাওয়া যায়নি</h3>
                <p className="mt-2 text-sm opacity-60">
                  অন্য দামের সীমা নির্বাচন করুন।
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary mt-5 rounded-xl"
                >
                  সব পণ্য দেখুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {sortedProducts.map((product) => {
                  const difference = product.today - product.yesterday;

                  const changePercent =
                    product.yesterday !== 0
                      ? (difference / product.yesterday) * 100
                      : 0;

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-800 hover:shadow-lg "
                    >
                      <div className="mb-5 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-3xl transition group-hover:scale-105">
                            {product.image}
                          </div>

                          <div className="min-w-0">
                            <h3 className="line-clamp-2 font-bold leading-6">
                              {product.nameBn}
                            </h3>
                            <p className="mt-1 text-xs opacity-50">
                              প্রতি{" "}
                              {product.unit === "kg" ? "কেজি" : product.unit}
                            </p>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-lg bg-base-200 px-2 py-1 text-xs">
                          #{product.id}
                        </span>
                      </div>

                      <div className="rounded-xl bg-base-200/70 p-4">
                        <p className="mb-1 text-xs opacity-60">আজকের দাম</p>

                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-3xl font-extrabold tracking-tight">
                            ৳{product.today}
                          </span>

                          {difference !== 0 && (
                            <span
                              className={`text-xs font-bold ${
                                difference > 0 ? "text-error" : "text-success"
                              }`}
                            >
                              {difference > 0 ? "▲" : "▼"}{" "}
                              {Math.abs(changePercent).toFixed(1)}%
                            </span>
                          )}

                          {difference === 0 && (
                            <span className="text-xs font-semibold opacity-60">
                              অপরিবর্তিত
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-base-300 pt-4">
                        <div>
                          <p className="text-xs opacity-60">গতকাল</p>
                          <p className="mt-1 font-semibold">
                            ৳{product.yesterday}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs opacity-60">দামের পরিবর্তন</p>
                          <p
                            className={`mt-1 font-bold ${
                              difference > 0
                                ? "text-error"
                                : difference < 0
                                  ? "text-success"
                                  : "opacity-60"
                            }`}
                          >
                            {difference > 0 ? "+" : ""}৳{difference}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductCategoryClient;
