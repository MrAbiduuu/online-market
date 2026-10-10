import React from "react";
import MarqueeText from "react-marquee-text";
import HeroSec from "./HeroSec";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  const data = await res.json();

  console.log(data);

  const products: Product[] = Array.isArray(data)
    ? data
    : data.data || data.products || [];

  return (
    <div>
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="flex items-center">
          {/* Title */}
          <div className="z-10 shrink-0 bg-red-600 px-5 py-3 text-sm font-bold text-white">
            📈 আজকের বাজার দর
          </div>

          {/* Marquee */}
          <MarqueeText direction="right" pauseOnHover duration={5}>
            <div className="relative flex-1 overflow-hidden">
              <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap px-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-lg">{product.categoryIcon}</span>

                    <span className="font-semibold text-gray-800">
                      {product.nameBn}
                    </span>

                    <span className="font-bold text-gray-900">
                      ৳{product.today}
                    </span>

                    {product.change.dir === "up" && (
                      <span className="text-green-600">
                        ▲ {product.change.pct}%
                      </span>
                    )}

                    {product.change.dir === "down" && (
                      <span className="text-red-600">
                        ▼ {Math.abs(product.change.pct)}%
                      </span>
                    )}

                    {product.change.dir === "flat" && (
                      <span className="text-gray-500">— 0%</span>
                    )}

                    <span className="text-gray-400">/{product.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
