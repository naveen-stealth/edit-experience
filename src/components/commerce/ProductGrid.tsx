import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, className = "" }: { products: Product[]; className?: string }) {
  if (products.length === 0) return null;

  return (
    <div className={`grid grid-cols-2 gap-x-6 gap-y-10 tablet:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
