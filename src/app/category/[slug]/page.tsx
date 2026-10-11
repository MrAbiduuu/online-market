import ProductCategoryClient from "@/app/components/ProductCategoryClient";
import React from "react";

export interface ProductChange {
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
}

const ProductCategory = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductChange[] = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid products API response");
  }

  return <ProductCategoryClient products={data} slug={slug} />;
};

export default ProductCategory;
