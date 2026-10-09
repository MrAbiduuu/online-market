import DecreasedPrice from "./components/DecreasedPrice";
import IncreasedPrice from "./components/IncreasedPrice";
import Marquee from "./components/Marquee";

export default async function Home() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!res.ok) {
    return <p className="p-10 text-red-600">Failed to load products.</p>;
  }

  const result = await res.json();

  // Check the actual API response in your terminal
  console.log("API RESPONSE:", JSON.stringify(result, null, 2));

  // Handle common API response structures
  const raw = result.data ?? result.products ?? result;

  const products = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.products)
      ? raw.products
      : raw && typeof raw === "object" && raw.id
        ? [raw]
        : [];

  const increasedProducts = products.filter(
    (p) => p.change?.dir?.toLowerCase() === "up",
  );

  const decreasedProducts = products.filter(
    (p) => p.change?.dir?.toLowerCase() === "down",
  );

  return (
    <div>
      <Marquee />

      <div className="container mx-auto space-y-10 px-4 py-8">
        <section>
          <h1 className="mb-5 text-2xl font-bold text-gray-900">
            <span className="text-red-500">▲</span> আজ দাম বেড়েছে
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({increasedProducts.length}টি পণ্য)
            </span>
          </h1>

          <IncreasedPrice product={increasedProducts} />
        </section>

        <section>
          <h1 className="mb-5 text-2xl font-bold text-gray-900">
            <span className="text-green-600">▼</span> আজ দাম কমেছে
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({decreasedProducts.length}টি পণ্য)
            </span>
          </h1>

          <DecreasedPrice product={decreasedProducts} />
        </section>
      </div>
    </div>
  );
}
