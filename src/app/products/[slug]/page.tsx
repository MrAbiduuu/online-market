import Link from "next/link";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image?: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const result = await res.json();
  const raw = result.data ?? result.products ?? result;

  if (Array.isArray(raw)) return raw as Product[];
  if (Array.isArray(raw?.products)) return raw.products as Product[];
  if (raw && typeof raw === "object" && "id" in raw) {
    return [raw as Product];
  }

  return [];
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let products: Product[];

  try {
    products = await getProducts();
  } catch {
    return (
      <main className="min-h-screen bg-base-200 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl bg-base-100 p-8 text-center shadow">
          <p className="text-4xl">⚠️</p>
          <h1 className="mt-4 text-2xl font-bold">
            পণ্যের তথ্য লোড করা যায়নি
          </h1>
          <p className="mt-2 opacity-70">
            অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
          <Link href="/" className="btn btn-primary mt-6 rounded-xl">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const product = products.find((p) => String(p.slug).trim() === slug.trim());

  if (!product) {
    return (
      <main className="min-h-screen bg-base-200 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl bg-base-100 p-8 text-center shadow">
          <p className="text-5xl">🔎</p>
          <h1 className="mt-4 text-2xl font-bold">পণ্য খুঁজে পাওয়া যায়নি</h1>
          <p className="mt-2 text-sm opacity-60">
            অনুরোধ করা পণ্যের সঠিক তথ্য পাওয়া যায়নি।
          </p>
          <Link href="/" className="btn btn-primary mt-6 rounded-xl">
            সব পণ্য দেখুন
          </Link>
        </div>
      </main>
    );
  }

  const difference = product.today - product.yesterday;
  const isUp = difference > 0;
  const isDown = difference < 0;

  const changePercent =
    product.yesterday !== 0 ? (difference / product.yesterday) * 100 : 0;

  const history = [
    { label: "গতকাল", price: product.yesterday },
    { label: "গত সপ্তাহ", price: product.lastWeek },
    { label: "গত মাস", price: product.lastMonth },
  ];

  return (
    <main className="min-h-screen bg-base-200/50">
      <div className="container mx-auto space-y-8 px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm opacity-70">
          <Link href="/" className="hover:text-primary">
            হোম
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-primary"
          >
            {product.categoryNameBn}
          </Link>
          <span>/</span>
          <span className="font-semibold opacity-100">{product.nameBn}</span>
        </div>

        {/* Product overview */}
        <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          <div className="grid md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-6 sm:p-10">
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                {product.categoryIcon} {product.categoryNameBn}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                {product.nameBn}
              </h1>

              <p className="mt-3 text-sm opacity-60">
                এক নজরে পণ্যের বর্তমান দাম ও বাজারের মূল্যতালিকা।
              </p>

              <div
                className={`mt-8 rounded-2xl border p-6 ${
                  isUp
                    ? "border-red-200 bg-red-50"
                    : isDown
                      ? "border-green-200 bg-green-50"
                      : "border-base-300 bg-base-200/60"
                }`}
              >
                <p className="text-sm text-gray-600">আজকের বাজারদর</p>

                <div className="mt-2 flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    ৳{product.today}
                  </span>
                  <span className="text-sm text-gray-600">
                    /{product.unit === "kg" ? "কেজি" : product.unit}
                  </span>
                </div>

                <div className="mt-4">
                  {difference === 0 ? (
                    <span className="inline-flex rounded-full bg-gray-200 px-3 py-2 text-sm font-bold text-gray-700">
                      — দাম অপরিবর্তিত
                    </span>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold ${
                        isUp
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {isUp ? "▲" : "▼"} ৳{Math.abs(difference)} (
                      {Math.abs(changePercent).toFixed(1)}%)
                      {isUp ? " বৃদ্ধি" : " হ্রাস"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Price history */}
            <div className="border-t border-base-300 bg-base-200/50 p-6 sm:p-8 md:border-l md:border-t-0">
              <h2 className="text-lg font-bold">দামের ইতিহাস</h2>
              <p className="mt-1 text-sm opacity-60">
                আগের সময়ের দামের সঙ্গে তুলনা করুন
              </p>

              <div className="mt-6 space-y-4">
                {history.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-4"
                  >
                    <div>
                      <p className="text-sm opacity-60">{item.label}</p>
                      <p className="mt-1 text-xl font-bold">৳{item.price}</p>
                    </div>
                    <span className="text-2xl opacity-50">৳</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-base-100 p-4">
                <p className="text-sm font-semibold">💡 কেনাকাটার পরামর্শ</p>
                <p className="mt-2 text-sm leading-6 opacity-70">
                  কেনার আগে বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম তুলনা করে
                  নিন।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market prices */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-primary">
                MARKET COMPARISON
              </p>
              <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                বিভিন্ন বাজারের দাম
              </h2>
              <p className="mt-2 text-sm opacity-60">
                বাজার ও বিভাগ অনুযায়ী মূল্যতালিকা
              </p>
            </div>

            <span className="rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm">
              🏪 {product.markets?.length ?? 0}টি বাজার
            </span>
          </div>

          {!product.markets?.length ? (
            <div className="rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
              <p className="text-3xl">🏪</p>
              <p className="mt-3 font-semibold">
                বাজারের তথ্য এখনো পাওয়া যায়নি
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral text-neutral-content">
                    <tr>
                      <th className="whitespace-nowrap p-4">বাজার</th>
                      <th className="whitespace-nowrap p-4">বিভাগ</th>
                      <th className="whitespace-nowrap p-4">সর্বনিম্ন দাম</th>
                      <th className="whitespace-nowrap p-4">সর্বোচ্চ দাম</th>
                    </tr>
                  </thead>

                  <tbody>
                    {product.markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className="border-t border-base-300 transition-colors hover:bg-base-200/60"
                      >
                        <td className="whitespace-nowrap p-4 font-semibold">
                          🏪 {market.market}
                        </td>
                        <td className="whitespace-nowrap p-4">
                          {market.division}
                        </td>
                        <td className="whitespace-nowrap p-4">
                          <span className="rounded-lg bg-green-100 px-3 py-1.5 font-bold text-green-700">
                            ৳{market.min}
                          </span>
                        </td>
                        <td className="whitespace-nowrap p-4">
                          <span className="rounded-lg bg-red-100 px-3 py-1.5 font-bold text-red-700">
                            ৳{market.max}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <div className="gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
          <Link
            href={`/category/${product.category}`}
            className="btn btn-outline text-xl rounded-xl hover:bg-green-900 hover:text-white"
          >
            সব {product.categoryNameBn} দেখুন →
          </Link>
        </div>
      </div>
    </main>
  );
}
