import { IncreasedPriceProps } from "@/types/productTypes";
import Link from "next/link";
import React from "react";

type ProductPriceItem = {
  id: string | number;
  slug: string;
  categoryIcon: React.ReactNode;
  nameBn: string;
  categoryNameBn: string;
  today: number | string;
  yesterday: number | string;
  unit?: string;
  change?: {
    dir?: string;
    pct?: number | string;
  };
};

type LocalIncreasedPriceProps = IncreasedPriceProps & {
  increasedProducts?: ProductPriceItem[];
  products?: ProductPriceItem[];
};

const IncreasedPrice = ({
  increasedProducts,
  products,
}: LocalIncreasedPriceProps) => {
  const visibleProducts = (increasedProducts ?? products ?? []).filter(
    (p) => p.change?.dir === "up",
  );

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {visibleProducts.slice(0, 6).map((p) => (
        <Link
          key={p.id}
          href={`/products/${p.slug}`}
          className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div key={p.id}>
            {/* Product info */}
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
                {p.categoryIcon}
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">{p.nameBn}</h2>
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

                <span className="rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-600">
                  ▲ {p.change?.pct}%
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                গতকাল: ৳{p.yesterday}
              </p>
            </div>
          </div>
        </Link>
      ))}

      {visibleProducts.length === 0 && (
        <p className="col-span-full py-8 text-center text-gray-500">
          আজ কোনো পণ্যের দাম বাড়েনি।
        </p>
      )}
    </div>
  );
};

export default IncreasedPrice;
