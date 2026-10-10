import AllProducts from "./components/AllProducts";
import DecreasedPrice from "./components/DecreasedPrice";
import HeroSec from "./components/HeroSec";
import IncreasedPrice from "./components/IncreasedPrice";
// import Marquee from "./components/Marquee";

export default async function Home() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!res.ok) {
    return <p className="p-10 text-red-600">Failed to load products.</p>;
  }

  const result = await res.json();

  type ProductChange = {
    dir?: "up" | "down";
    pct?: number;
  };

  type Product = {
    id: string | number;
    slug: string;
    categoryIcon: string;
    nameBn: string;
    categoryNameBn: string;
    today: number;
    yesterday: number;
    unit: string;
    change?: ProductChange;
    [key: string]: unknown;
  };

  // Check the actual API response in your terminal
  console.log("API RESPONSE:", JSON.stringify(result, null, 2));

  // Handle common API response structures
  const raw = result.data ?? result.products ?? result;

  const products: Product[] = (
    Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.products)
        ? raw.products
        : raw && typeof raw === "object" && "id" in raw
          ? [raw]
          : []
  )
    .filter(
      (item: unknown): item is Product =>
        !!item &&
        typeof item === "object" &&
        "id" in item &&
        (typeof item.id === "string" || typeof item.id === "number"),
    )
    .map((product: Product) => {
      const change =
        product.change && typeof product.change === "object"
          ? product.change
          : undefined;
      const rawDir =
        change && typeof change === "object" && "dir" in change
          ? change.dir
          : undefined;
      const normalizedDir =
        typeof rawDir === "string" ? rawDir.toLowerCase() : undefined;

      return {
        ...product,
        change: change
          ? {
              ...change,
              dir:
                rawDir === "up" || rawDir === "down"
                  ? rawDir
                  : normalizedDir === "up"
                    ? "up"
                    : normalizedDir === "down"
                      ? "down"
                      : undefined,
              pct: typeof change.pct === "number" ? change.pct : undefined,
            }
          : undefined,
      };
    });

  const increasedProducts = products.filter(
    (p: Product) => p.change?.dir === "up",
  );

  const decreasedProducts = products.filter(
    (p: Product) => p.change?.dir === "down",
  );

  return (
    <div>
      {/* <Marquee /> */}

      <HeroSec />
      <div className="container mx-auto space-y-10 px-4 py-8">
        <section>
          <h1 className="mb-5 text-2xl font-bold text-gray-900">
            <span className="text-red-500">▲</span> আজ দাম বেড়েছে
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({increasedProducts.length}টি পণ্য)
            </span>
          </h1>

          <IncreasedPrice
            product={products}
            increasedProducts={increasedProducts}
          />
        </section>

        <section>
          <h1 className="mb-5 text-2xl font-bold text-gray-900">
            <span className="text-green-600">▼</span> আজ দাম কমেছে
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({decreasedProducts.length}টি পণ্য)
            </span>
          </h1>

          <DecreasedPrice decreasedProducts={decreasedProducts} />
        </section>
        <section>
          <h1 className="mb-5 text-2xl font-bold text-gray-900 flex flex-col">
            সব পণ্য
            <span className="text-sm font-normal text-gray-500">
              (মোট {products.length}টি পণ্য দেখানো হচ্ছে)
            </span>
          </h1>

          <AllProducts product={products} />
        </section>
      </div>
    </div>
  );
}
