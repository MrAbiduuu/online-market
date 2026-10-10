"use client";

import { IncreasedPriceProps } from "@/types/productTypes";
import Link from "next/link";
import { useMemo, useState } from "react";

type SortOption =
  | "default"
  | "price-low"
  | "price-high"
  | "name"
  | "increase"
  | "decrease";

const AllProducts = ({ product }: IncreasedPriceProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const toNumber = (value: number | string | null | undefined) =>
    Number(value ?? 0);

  const sortedProducts = useMemo(() => {
    const result = [...product];

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => toNumber(a.today) - toNumber(b.today));
        break;

      case "price-high":
        result.sort((a, b) => toNumber(b.today) - toNumber(a.today));
        break;

      case "name":
        result.sort((a, b) =>
          (a.nameBn ?? "").localeCompare(b.nameBn ?? "", "bn"),
        );
        break;

      case "increase":
        result.sort(
          (a, b) =>
            toNumber(b.today) -
            toNumber(b.yesterday) -
            (toNumber(a.today) - toNumber(a.yesterday)),
        );
        break;

      case "decrease":
        result.sort(
          (a, b) =>
            toNumber(a.today) -
            toNumber(a.yesterday) -
            (toNumber(b.today) - toNumber(b.yesterday)),
        );
        break;
    }

    return result;
  }, [product, sortBy]);

  return (
    <div>
      {/* Sorting bar */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3">
          <label
            htmlFor="product-sort"
            className="text-sm font-semibold text-gray-600"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="select select-bordered w-48 rounded-xl border-gray-300 bg-white text-sm text-gray-800 focus:border-green-700 focus:outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
            <option value="increase">দাম বৃদ্ধি অনুযায়ী</option>
            <option value="decrease">দাম হ্রাস অনুযায়ী</option>
          </select>
        </div>
      </div>

      {/* Product cards */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((p) => {
            const difference = toNumber(p.today) - toNumber(p.yesterday);

            return (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-800 hover:shadow-lg"
              >
                {/* Product info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
                    {p.categoryIcon}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {p.nameBn}
                    </h2>
                    <p className="text-sm text-gray-500">{p.categoryNameBn}</p>
                  </div>
                </div>

                {/* Price info */}
                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">আজকের দাম</p>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <h3 className="text-3xl font-extrabold text-gray-900">
                      ৳{p.today}
                      <span className="ml-1 text-sm font-medium text-gray-500">
                        /{p.unit === "kg" ? "কেজি" : p.unit}
                      </span>
                    </h3>

                    <span
                      className={`rounded-lg px-3 py-2 text-sm font-bold ${
                        difference < 0
                          ? "bg-green-50 text-green-700"
                          : difference > 0
                            ? "bg-red-50 text-red-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {difference > 0 ? "▲" : difference < 0 ? "▼" : "—"}{" "}
                      {p.change?.pct ?? 0}%
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    গতকাল: ৳{p.yesterday}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
