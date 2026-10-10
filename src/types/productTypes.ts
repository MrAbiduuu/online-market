export interface ProductChange {
  dir?: "up" | "down";
  pct?: number;
}

export interface ProductItem {
  id: string | number;
  slug: string;
  nameBn?: string;
  categoryNameBn?: string;
  categoryIcon?: string | React.ReactNode;
  today?: number | string;
  yesterday?: number | string;
  unit?: string;
  change?: ProductChange;
}

export interface IncreasedPriceProps {
  product: ProductItem[];
}
